const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const tokenHanlder = asyncHandler(async(req , res , next) => {
    let token;

    let authHeader = req.header.Authorization || req.header.authorization;

    if(authHeader && authHeader.startWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.TOKEN_SECRET , (err , decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized")
            }console.log(decoded)
        })
    }
    
});