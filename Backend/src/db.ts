import mongoose, { Model, Schema } from "mongoose";


const userSchema = new Schema({
    username : {type : String, unique : true, required : true}, 
    password : {type : String, required : true}
})

export const userModel = mongoose.model("User", userSchema);

const contentSchema = new Schema ({
    title : String,
    link : String, 
    tags : [{type : mongoose.Types.ObjectId, ref : 'Tag'}], 
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true} 
})

export const contentModel = mongoose.model("Content", contentSchema);