import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated=asyncHandler(async(req,res,next)=>{
    const token=req.cookies?.token  || req.headers["authorization"]?.replace('Bearer ','');
    if(!token){
        return next(new errorHandler("Invalid token",400));
    }
    const tokenData= await jwt.verify(token,process.env.JWT_SECRET);

    req.userId=tokenData._id
    next()

    // console.log(tokenData)
})