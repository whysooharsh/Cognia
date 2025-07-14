import mongoose, { Model, Schema } from "mongoose";


const userSchema = new Schema({
    username : {type : String, unique : true, required : true}, 
    password : {type : String, required : true}
})

export const  userModel = mongoose.model("User", userSchema);


