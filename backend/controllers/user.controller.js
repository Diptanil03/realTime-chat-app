import User from "../models/user.model.js"
import { asyncHandler } from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { sendToken } from "../utilities/sendToken.utility.js"


const login=asyncHandler(async(req,res,next)=>{
        const {email,password}=req.body
        if(!email || !password){
            return next(new errorHandler("please enter a valid email or password",400))
        }

        const user=await User.findOne({email});
        if(!user){
            return next(new errorHandler("please enter a valid email or password",400));
        }
        
        const isValidPassword=await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return next(new errorHandler("please enter a valid email or password",400));
        }

        /*

        const tokenData={
            _id:user?._id
        }

        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1h'})

        return res.status(200).cookie("token",{
            expires:1*24*60*60*1000,
            httpOnly:true,
            secure:process.env.NODE_ENV == 'production',
            sameSite:'None'
        }).json({
            success:true,
            user,
            token
        })
        
        */
       sendToken(user, 200, res);

})

const register=asyncHandler(async(req,res,next)=>{
        const {fullName,email,password,gender}=req.body
        if(!fullName || !email || !password || !gender){
            return next(new errorHandler("all fields are required!",400))
        }

        const user=await User.findOne({email});
        if(user){
            return next(new errorHandler("user already exists",400));
        }
        let avater;
        if(gender=='male'){
             avater=`https://avatarapi.runflare.run/public/boy?username=${fullName}`
        }else{
             avater=`https://avatarapi.runflare.run/public/girl?username=${fullName}`
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=await User.create({
            fullName,
            email,
            password:hashedPassword,
            gender,
            avater
        })

        

        // const tokenData={
        //     _id:newUser?._id
        // }

        // const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1h'})

        // return res.status(200).cookie("token",{
        //     expires:1*24*60*60*1000,
        //     httpOnly:true,
        //     secure:true,
        //     sameSite:'None'
        // }).json({
        //     success:true,
        //     user:newUser,
        //     token
        // })

       sendToken(newUser, 200, res);
})


const getProfile=asyncHandler(async(req,res,next)=>{

    const userId=req.userId;


    const profile=await User.findById(userId);

    res.status(200).json({
        success:true,
        responseData:profile
    })
})

const logout=asyncHandler(async(req,res,next)=>{
    return res.status(200).cookie("token","",{
            expires:new Date(Date.now()) ,
            httpOnly:true,
            secure:true,
            sameSite:'None'
        }).json({
            success:true,
            message:"logout successfully"
        })
})


const otherUsers=asyncHandler(async(req,res,next)=>{

    const userId=req.userId;



    const otherProfiles=await User.find({_id:{$ne:userId}});


    res.status(200).json({
        success:true,
        responseData:otherProfiles
    })
})

export {login,register,getProfile,logout,otherUsers}