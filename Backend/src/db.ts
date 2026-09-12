import mongoose, { Model, Schema } from "mongoose";


const userSchema = new Schema({
    username : {type : String, unique : true, required : true}, 
    password : {type : String, required : true},
})

export const userModel = mongoose.model("User", userSchema);

const contentSchema = new Schema ({
    title : String,
    link : String, 
    content : String, 
    imageUrl : String,
    tags : [String], 
    type : String,
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true},
    workspaceId : {type : mongoose.Types.ObjectId, ref : 'Workspace', default : null},
    isPinned : {type : Boolean, default : false},
}, { timestamps: true })

contentSchema.index( {
    title : "text", 
    content : "text", 
    link : "text", 
    tags : "text",
});

export const contentModel = mongoose.model("Content", contentSchema);

const linkSchema = new Schema ({
    hash : {type : String, unique : true},
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true, unique : true} 
})

export const LinkModel = mongoose.model("Links", linkSchema);

const workspaceSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    icon: String,
    color: String,
    userId: {type : mongoose.Types.ObjectId, ref : 'User', required : true},
    isDefault: {type: Boolean, default: false},
}, { timestamps: true });

export const WorkspaceModel = mongoose.model("Workspace", workspaceSchema);