import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { contentModel, LinkModel, userModel, WorkspaceModel } from "./db";
import { JWT_SECRET, MONGODB_URI, PORT } from "./config";
import { userMiddleware } from "./middleware";
import { helper } from "./util";
import cors from "cors"
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: [
        "https://cognia-jet.vercel.app",
        "http://localhost:5173",
        "https://cognia-x.vercel.app",

    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


const saltRounds = 10;

app.post("/api/v1/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
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
            message: "Internal server error"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            })
        }

        const existingUser = await userModel.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }

        const passOk = await bcrypt.compare(password, existingUser.password);

        if (!passOk) {
            return res.status(403).json({
                message: "Wrong credentials"
            });
        }

        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET, { expiresIn: "30d" });

        const response = {
            message: "Login successful",
            token: token
        };

        return res.status(200).json(response)


    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }


});


app.post("/api/v1/content", userMiddleware, async (req, res) => {

    try {
        const { title, link, content, type, imageUrl } = req.body;
        if (!title || !type) {
            return res.status(400).json({
                message: "Title and Type are Required"
            });
        }

        if (type === "note" && !content) {
            return res.status(400).json({
                message: "Content is required for creating note"
            });
        }

        if ((type === "youtube" || type === "twitter" || type === "link") && !link) {
            return res.status(400).json({
                message: "Link is required for this content type"
            });
        }

        const createdContent = await contentModel.create({
            title,
            ...(link && { link }),
            ...(content && { content }),
            ...(imageUrl && { imageUrl }),
            type,
            userId: req.userId,
            tags: req.body.tags || [],
            ...(req.body.workspaceId && { workspaceId: req.body.workspaceId })
        });
        return res.json({
            message: "content added",
            createdContent: createdContent
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server error",
        });
    }

});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const type = req.query.type as string;
        const workspaceId = req.query.workspaceId as string;
        const filter: any = { userId: userId };
        if (type) {
            filter.type = type;
        }
        if (workspaceId) {
            filter.workspaceId = workspaceId;
        }

        const content = await contentModel
            .find(filter)
            .select('title link content type tags workspaceId isPinned createdAt updatedAt')
            .sort({ isPinned: -1, createdAt: -1 })
            .populate("userId", "username");

        res.json({
            content
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }


});


app.delete("/api/v1/content/:id", userMiddleware, async (req, res) => {
    try {
        const contentId = req.params.id;
        if (!contentId || contentId === "undefined") {
            return res.status(400).json({ message: "Invalid content ID provided" });
        }
        const result = await contentModel.deleteOne({
            _id: contentId,
            userId: req.userId,
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Content not found or unauthorized" });
        }
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put("/api/v1/content/:id", userMiddleware, async (req, res) => {
    try {
        const updated = await contentModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { ...(req.body.title !== undefined && { title: req.body.title }), ...(req.body.content !== undefined && { content: req.body.content }) },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Content not found" });
        res.json({ message: "Content updated", content: updated });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.patch("/api/v1/content/:id/pin", userMiddleware, async (req, res) => {
    try {
        const contentId = req.params.id;
        const content = await contentModel.findOne({ _id: contentId, userId: req.userId });
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }
        content.isPinned = !content.isPinned;
        await content.save();
        res.json({ message: content.isPinned ? "Pinned" : "Unpinned", isPinned: content.isPinned });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/api/v1/user", userMiddleware, async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select("username");
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            username: user.username
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error"
        })
    }
})

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {

    try {
        const share = req.body.share === true || req.body.share === "true";

        if (share) {
            let hash = "";
            for (let attempt = 0; attempt < 3; attempt++) {
                hash = helper(10);
                const existing = await LinkModel.findOne({ hash });
                if (!existing) break;
                if (attempt === 2) {
                    return res.status(500).json({ message: "Internal Server Error" });
                }
            }
            await LinkModel.findOneAndUpdate(
                { userId: req.userId },
                { hash: hash },
                { upsert: true, new: true }
            );

            res.json({
                message: "Share link created",
                hash: hash
            })
        } else {
            await LinkModel.deleteMany({
                userId: req.userId,
            });
            res.json({
                message: "Removed Link",
                share: false
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

});

app.get("/api/v1/brain/:shareLink", async (req, res) => {

    try {

        const hash = req.params.shareLink;
        const link = await LinkModel.findOne({ hash });
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

app.get("/api/v1/search", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const q = req.query.q as string;

        if (!q || q.trim() === "") {
            return res.json({
                results: []
            });
        }

        const escaped = q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchRegex = new RegExp(escaped, "i");

        const results = await contentModel.find({
            userId,
            $or: [
                { title: searchRegex },
                { content: searchRegex },
                { link: searchRegex }
            ]
        });

        return res.json({
            results: results
        });

    }
    catch (error) {
        console.error("Search error:", error);
        res.status(500).json({
            message: "Internal Server error",
        })
    }
})

app.get("/api/v1/workspaces", userMiddleware, async (req, res) => {
    try {
        const workspaces = await WorkspaceModel.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json({ workspaces });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/api/v1/workspaces", userMiddleware, async (req, res) => {
    try {
        const { name, color, icon } = req.body;
        if (!name?.trim()) {
            return res.status(400).json({ message: "Workspace name is required" });
        }
        const workspace = await WorkspaceModel.create({
            name: name.trim(),
            color: color || "#6B7280",
            icon: icon || "folder",
            userId: req.userId,
        });
        res.status(201).json({ workspace });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put("/api/v1/workspaces/:id", userMiddleware, async (req, res) => {
    try {
        const { name, color, icon } = req.body;
        const updated = await WorkspaceModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { ...(name && { name }), ...(color && { color }), ...(icon && { icon }) },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Workspace not found" });
        res.json({ workspace: updated });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete("/api/v1/workspaces/:id", userMiddleware, async (req, res) => {
    try {
        const result = await WorkspaceModel.deleteOne({ _id: req.params.id, userId: req.userId });
        if (result.deletedCount === 0) return res.status(404).json({ message: "Workspace not found" });
        await contentModel.updateMany(
            { workspaceId: req.params.id, userId: req.userId },
            { $unset: { workspaceId: "" } }
        );
        res.json({ message: "Workspace deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

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
