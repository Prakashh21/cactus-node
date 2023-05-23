const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req , res) => {
    const {username , email , password } = req.body;
    if(!username, !email , !password){
        res.status(400)
        throw new Error("please enter all the fields , all the fields are mandatory")
    }


    const userAvailable = await User.findOne({email})

    if(userAvailable){
        res.status(400)
        throw new Error("user already registered")
    }

    const hashedPasswd = await bcrypt.hash(password, 10)
    console.log("hashed password --> ",hashedPasswd)

    const user = await User.create({
        username: username,
        email: email,
        password: hashedPasswd
    })

    if(user){
        res.status(201).json({_id: user.id , email: user.email})
    }else{
        res.status(400)
        throw new Error("User data not valid")
    }
    
    res.json({message: "register user"});

})

const loginUser = asyncHandler(async (req , res) => {
    const {email , password} = req.body;

    if( !email || !password){
        res.status(404)
        throw new Error("all fields are mandatory")
    }

    const user = await User.findOne({email});
    if(user && bcrypt.compare(password , user.password)){

            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            },
            process.env.TOKEN_SECRET,
            {expiresIn: "1m"}
            );
        res.status(200).json({ accessToken })
    }else{  
        res.status(401)
        throw new Error("invalid username or password")
    }
 
})

const currentUser = asyncHandler(async (req , res) => {
    res.json({message: "current user"})
})

const allUsers = asyncHandler(async(req ,res) => {
    const users = await User.find({})
    res.json({message: "all users", data: users})
})

module.exports = {
    registerUser,
    loginUser,
    currentUser,
    allUsers
}