import mongoose from "mongoose";

const connectdb=async()=>{
    await mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log("mongodb connected successfully")
    }).catch((error)=>{
        console.log('mongodb connection error: ',error)
    })
}

export {connectdb}