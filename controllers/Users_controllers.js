const Users = require("../models/Users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const RegisterUser = asyncHandler(async(req,res)=>{
    const{username,email,password} = req.body; 
    if(!username ||!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userav = await Users.findOne({email});
    if(userav){
        res.status(400);
        throw new Error("User already registered!");
    }
    const Hashedpass = await bcrypt.hash(password,10);
    const user = await Users.create({
        username,
        email,
        password : Hashedpass,
    });
    if(user){
        res.status(201).json({_id : user.id, username: user.username});
    }
    else{
        res.status(400);
        throw new Error("User Data Invalid!"); 
    }
});

const LoginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await Users.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email:user.email,
                id:user.id,
            },  
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
         res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email Or Password are Invalid!");
    }
});

const CurrentUser = asyncHandler(async(req,res)=>{
    res.status(201).json(req.user);
});
module.exports = {RegisterUser,LoginUser,CurrentUser};