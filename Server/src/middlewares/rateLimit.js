import {rateLimit, ipKeyGenerator } from "express-rate-limit";

// This middleware limits the number of requests a user can make to the server
// It helps to prevent abuse and denial of service attacks by limiting the number of requests from a

export const rateLimiter = rateLimit({
    windowMs:2 * 60 * 1000, //15 minutes
    max:10, //limit each IP to 3 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, //Return rate limit info in the `RateLimit-*` headers
    keyGenerator: (req)=> {
        return `${ipKeyGenerator(req.ip)}-${req.headers['user-agent'] || "unknown-user-agent"}`; //use IP and user-agent as key to identify the client
    },
    legacyHeaders:false, //disable the `X-RateLimit-*` headers
    trustProxy: true, //trust the first proxy in front of your app (if you are using a reverse proxy like Nginx or Heroku)

});
//rate limit for refresh token route
export const refreshTokenLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: "Too many refresh token requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    keyGenerator: (req) => {
        return `${ipKeyGenerator(req.ip)}-${req.headers['user-agent'] || "unknown-user-agent"}`;
    },
    legacyHeaders: false,// disable the `X-RateLimit-*` headers
    // If your app is behind a reverse proxy, you might need to set this to true
    trustProxy: true,
});
