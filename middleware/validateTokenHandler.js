const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const tokenHandler = asyncHandler(async(req , res , next) => {
    let token;

    let authHeader = req.headers.Authorization || req.headers.authorization;
    


    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.TOKEN_SECRET , (err , decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not authorized")
            }
            // console.log(decoded)
            req.user = decoded.user;
            next(); 
        });

        if(!token){
            res.status(401);
            throw new Error("User is not authorized token is missing")
        }
    }
    else if(!authHeader){
        res.status(404)
        throw new Error("authHeader not found")
    }
    
});


module.exports = tokenHandler; 