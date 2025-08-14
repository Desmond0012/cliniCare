import jwt from "jsonwebtoken";

export const signToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  });
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  });
  return { accessToken, refreshToken };
};

export const createSendToken = (user) => {
  if (!user) return;
  const token = signToken(user._id); //this from mongodb id doc
  //create cookie to store our refreshToken in order to prevent browser access on client side.
  const isProduction = process.env.NODE_ENV === "production";
  const coookieOptions = {
    httpOnly: true, // cookies is not access able in javascript
    secure: isProduction, //send cookie over HTTPS only when in production env
    maxAge: 7 * 24 *60 *60 * 1000, //cookie is valid for 7days
      path: "/api/v1/auth/refresh-token",//cookie is valid on all path across your domain
    // cookie is valid on all path across your domain
    sameSite: isProduction ? "none" : "lax", //is require when the cookie is being used diff domains. we want to adjust the cross-site request policy. Our app is both client/server which has fiffernt address so we want to ensure that in production mode, the cookie can be passed over a secure relay by setting the secure option to true (ensuring cookie is sent over HTTPS), but in dev mode we specify lax because we need to use it locally . if smaeSite is set to nne and secure is set to false, the browser will reject the cookie.
  };
  return {
    accessToken: token.accessToken,
    refreshToken: token.refreshToken,
    coookieOptions,
  };
};
