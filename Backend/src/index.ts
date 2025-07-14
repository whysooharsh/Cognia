import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { contentModel, userModel } from "./db";
import { JWT_SECRET, MONGODB_URI, PORT } from "./config";
import { userMiddleware } from "./middleware";
dotenv.config();



const app = express();
app.use(express.json());



const saltRounds = 10;

app.post("/api/v1/signup", async (req, res) => {
    try {
        console.log("Signup request received:", req.body);
        
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            console.log("Missing username or password in signup");
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            console.log("User already exists:", username);
            return res.status(411).json({
                message: "User already exists"
            });
        }

        console.log("Hashing password for user:", username);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        console.log("Creating user in database");
        const user = await userModel.create({
            username,
            password : hashedPassword
        });

        console.log("User created successfully:", user);

        res.status(201).json({
            message: "User signed up successfully",
            userId: user._id
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
})
app.post("/api/v1/signin", async (req, res) => {

    try{
        console.log("Signin request received:", req.body);
        
        const username = req.body.username; 
        const password = req.body.password;

        if(!username || !password){
            console.log("Missing username or password");
            return res.status(400).json({
                message : "Username and password are required"
            })
        }

        console.log("Looking for user:", username);
        const existingUser = await userModel.findOne({ username});
        if(!existingUser){
            console.log("User not found:", username);
            return res.status(411).json({
                message : "User doesn't exist"
            });
        }
        
        console.log("User found, comparing passwords");
        const passOk = await bcrypt.compare(password, existingUser.password);
        console.log("Password comparison result:", passOk);
        

        if(!passOk){
            console.log("Password incorrect");
            return res.status(403).json({
                message : "Wrong credentials"
            });
        }
        
        console.log("Generating token for user:", existingUser._id);
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);
        console.log("Token generated successfully:", token);

        const response = {
            message: "Login successful",
            token: token
        };
        console.log("Sending response:", response);
 
        return res.status(200).json(response)
         

    } catch(error){
        console.log("error signing up : ", error);
        res.status(500).json({
            message : "Internal Server Error"
        })
    }


})
 

app.post("/api/v1/content", userMiddleware, async (req, res) => {

    const link = req.body.link;
    const type = req.body.type; 

    await contentModel.create({
        link,
        type,
        //@ts-ignore
        userId : req.userId,        tags : []
    })
    return res.json({
        message : "content added"
    })

})

app.get("/api/v1/content", userMiddleware, async (req, res) => {

    //@ts-ignore 
    const userId = req.userId;
    const content = await contentModel.find({
        userId : userId
    }).populate("userId", "username");

    res.json({
        content
    })


})


app.delete("/api/v1/content", async (req, res) => {

    const contentId = req.body.contentId;

    await contentModel.deleteMany({
        contentId, 
        // @ts-ignore
        userId : req.userId, 
    })

    res.json({
        message : "Deleted"
    })
})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB connected successfully");
        console.log("Database:", mongoose.connection.db?.databaseName);
    }
    catch (err) {
        console.log("DB connection error ", err);
        process.exit(1);
    }
};

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});