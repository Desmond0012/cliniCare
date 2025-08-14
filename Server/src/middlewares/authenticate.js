import jwt from "jsonwebtoken";
import tryCatchFn from "../utils/tryCatchFn.js";
import User from "../models/user.js";
import responseHandler from "../utils/responseHandler.js";
import { promisify } from "util";
const { forbiddenResponse, unauthorizedResponse } = responseHandler;

export const verifyAuth = tryCatchFn(async (req, res, next) => {
  //get the token from the request header
  let token;
  // checking for our token in thr request headers object and ensuring it starts with the word "Bearer" signature word ensuring its jwt token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //split the string to get the token part after the "Bearer" word
  }
  //if token is not found, we return an unauthorized response
  if (!token) {
    return next(
      unauthorizedResponse(
        "You are not logged in, please login to gain access. "
      )
    );
  }
  //if token is found, we verify it
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  // CHECK IF USER EXISTS with our decoded id
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      unauthorizedResponse(
        "The user belonging to this token does no longer exist."
      )
    );
  }
  //assign the user to the request object so that it can be accessed in the next middleware or controller
  req.user = currentUser;
  next(); //call the next middleware or controller
});

// role baxed auth
export const authorizedRoles = (...roles) =>{
  return (req, res, next) =>{
    if(!roles.includes(req.user.role)){
      return next(
        forbiddenResponse("You do not have permissoin to perform this action")
      );
    }
    next();
  };
};
