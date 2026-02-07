import mongoose, { Model, Schema } from "mongoose";


const userSchema = new Schema({
    username : {type : String, unique : true, required : true}, 
    password : {type : String, required : true},
    settings: {
        theme: {type: String, default: 'light'},
        defaultView: {type: String, default: 'grid'},
    }
})

export const userModel = mongoose.model("User", userSchema);

const contentSchema = new Schema ({
    title : String,
    link : String, 
    content : String, 
    imageUrl : String,
    tags : [{type : mongoose.Types.ObjectId, ref : 'Tag'}], 
    type : String,
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true},
    // For plugin-created custom content types
    customFields: {type: Schema.Types.Mixed, default: {}},
    // Track which plugin created this if applicable
    createdByPlugin: {type: String, default: null},
}, { timestamps: true })

contentSchema.index( {
    title : "text", 
    content : "text", 
    link : "text", 
    tags : "text",
});

export const contentModel = mongoose.model("Content", contentSchema);

const linkSchema = new Schema ({
    hash : String,
    userId : {type : mongoose.Types.ObjectId, ref : 'User', required : true, unique : true} 
})

export const LinkModel = mongoose.model("Links", linkSchema);

// Plugin Schema - stores plugin definitions
const pluginSchema = new Schema({
    manifest: {
        id: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        version: {type: String, required: true},
        description: String,
        author: String,
        icon: String,
        permissions: [{type: String}],
        configSchema: Schema.Types.Mixed,
        hooks: Schema.Types.Mixed,
        actions: [Schema.Types.Mixed],
        contentTypes: [Schema.Types.Mixed],
    },
    code: {type: String, required: true}, // Sandboxed JavaScript
    isActive: {type: Boolean, default: true},
    isPublic: {type: Boolean, default: false},
    createdBy: {type : mongoose.Types.ObjectId, ref : 'User', required : true},
    installCount: {type: Number, default: 0},
    rating: Number,
}, { timestamps: true });

export const PluginModel = mongoose.model("Plugin", pluginSchema);

// User Plugin Installation Schema - tracks which plugins users have installed
const userPluginSchema = new Schema({
    userId: {type : mongoose.Types.ObjectId, ref : 'User', required : true},
    pluginId: {type : mongoose.Types.ObjectId, ref : 'Plugin', required : true},
    config: {type: Schema.Types.Mixed, default: {}},
    isEnabled: {type: Boolean, default: true},
    installedAt: {type: Date, default: Date.now},
});

userPluginSchema.index({ userId: 1, pluginId: 1 }, { unique: true });

export const UserPluginModel = mongoose.model("UserPlugin", userPluginSchema);

// Workspace/Collection Schema for organizing content
const workspaceSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    icon: String,
    color: String,
    userId: {type : mongoose.Types.ObjectId, ref : 'User', required : true},
    isDefault: {type: Boolean, default: false},
    contentIds: [{type : mongoose.Types.ObjectId, ref : 'Content'}],
}, { timestamps: true });

export const WorkspaceModel = mongoose.model("Workspace", workspaceSchema);