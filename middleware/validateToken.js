const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validatetoken = asyncHandler(async(req,res,next)=>{
    let token;
    // console.log("Vidhit");
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err)
            {
                res.status(401);
                throw new Error("User in not authorized");
            }
            req.user = decoded.user;
            // console.log(req.user)
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("User is not Authorized or token is missing !");
        }
    }
});

module.exports = validatetoken;