import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs: 4*60*1000,        //4 minutes time period
    max: 100,                   //Limit each IP to 100 requests per windowMs
    standardHeaders: true,      //Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,       //Disable the `X-RateLimit-*` headers
    message: {
      error: 'Too many requests, please try again later.'
    }
})