import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    senderId : { type : String, required : true },
    recieverId : { type : String, required : true},
    
    messageContent : { type : [{ time : String , message : String }], required : true },
    
})

const messageModel = mongoose.model('message',messageSchema)

export {messageModel}