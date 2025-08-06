import mongoose, { Model, Schema } from "mongoose";


const userSchema = new Schema({
    username : {type : String, unique : true, required : true}, 
    password : {type : String, required : true}
})

export const userModel = mongoose.model("User", userSchema);

const contentSchema = new Schema ({
    title : String,
    link : String, 
    content : String, 
    imageUrl : String,
    tags : [{type : mongoose.Types.ObjectId, ref : 'Tag'}], 
    type : String,
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true} 
})

export const contentModel = mongoose.model("Content", contentSchema);

const linkSchema = new Schema ({
    hash : String,
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true, unique : true} 
})

export const LinkModel = mongoose.model("Links", linkSchema);