import mongoose from "mongoose";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()


const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avater:{
        type:String,
    },
    gender:{
        type:String,
        enum:['male','female'],
        required:true
    }
},{timestamps:true})

userSchema.methods.getToken=function (){
    const tokenData={
                _id:this?._id
            }
    
        const token = jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1h'})
    return token;
}

const User=mongoose.model("User",userSchema)

export default User;