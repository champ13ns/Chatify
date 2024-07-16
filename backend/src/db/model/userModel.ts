import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {type : String, required : true},
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    email : { type : String, required : true },
    password : { type : String, required : true },
    salt : { type : String, required : true }
}, {
    toJSON : {
        transform(doc, ret) {
            delete ret.__v;
            delete ret._id;
        }
    },
    timestamps : true
})

const userModel = mongoose.model('user',userSchema)
export { userModel }