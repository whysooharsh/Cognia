import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { contentModel, LinkModel, userModel } from "./db";
import { JWT_SECRET, MONGODB_URI, PORT } from "./config";
import { userMiddleware } from "./middleware";
import { helper } from "./util";
import cors from "cors"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


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

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await userModel.create({
            username,
            password: hashedPassword
        });


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
});
app.post("/api/v1/signin", async (req, res) => {

    try {
        console.log("Signin request received:", req.body);

        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            console.log("Missing username or password");
            return res.status(400).json({
                message: "Username and password are required"
            })
        }

        const existingUser = await userModel.findOne({ username });
        if (!existingUser) {
            console.log("User not found:", username);
            return res.status(411).json({
                message: "User doesn't exist"
            });
        }

        const passOk = await bcrypt.compare(password, existingUser.password);

        if (!passOk) {
            console.log("Password incorrect");
            return res.status(403).json({
                message: "Wrong credentials"
            });
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

        const response = {
            message: "Login successful",
            token: token
        };

        return res.status(200).json(response)


    } catch (error) {
        console.log("error signing up : ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }


});


app.post("/api/v1/content", userMiddleware, async (req, res) => {

    try {
        const link = req.body.link;
        const type = req.body.type;
        await contentModel.create({
            link,
            type,

            userId: req.userId, tags: []
        });
        return res.json({
            message: "content added"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server error",
        });
    }

});

app.get("/api/v1/content", userMiddleware, async (req, res) => {

    try {
        const userId = req.userId;
        const content = await contentModel.find({
            userId: userId
        }).populate("userId", "username");

        res.json({
            content
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }


});


app.delete("/api/v1/content", async (req, res) => {

    try {

        const contentId = req.body.contentId;

        await contentModel.deleteMany({
            contentId,

            userId: req.userId,
        });

        res.json({
            message: "Deleted"
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

app.post("/api/v1/brain/share",userMiddleware, async (req, res) => {

    try {
        const share = req.body.share===true || req.body.share==="true";

        if (share) {
            const hash = helper(10);
            await LinkModel.findOneAndUpdate(
               { userId: req.userId },
               { hash: hash },
               { upsert : true, new : true }
            );

            res.json({
                message: "/share/" + hash
            })
        } else {
            await LinkModel.deleteMany({
                userId: req.userId,
            });
            res.json({
                message: "Removed Link",
                share : false
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

});

app.get("/api/v1/brain/:shareLink", async (req, res) => {

    try {

        const hash = req.params.shareLink;
        const link = await LinkModel.findOne({ hash });
        console.log(link);
        console.log(hash);
        if (!link) {
            return res.status(404).json({
                message: "Invalid Link"
            })
        }

        const [content, user] = await Promise.all([
            contentModel.find({
                userId: link.userId,
            }),
            userModel.findOne({
                _id: link.userId,
            })
        ]);

        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }

        return res.json({
            username: user.username,
            content,
        });
    } catch (err) {

        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        });

    }
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