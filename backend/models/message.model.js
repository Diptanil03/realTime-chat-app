import mongoose from "mongoose";

const messsageSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

const Message=mongoose.model("Message",messsageSchema)

export default Message;