import { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";
export const userMiddleware = (req:Request, res:Response, next:NextFunction) => {

    const header = req.headers["authorization"];
    if (!header) {
        return res.status(403).json({
            message: "You are not logged in"
        });
    }

    try {
        const decoded = jwt.verify(header as string, JWT_SECRET) as { id: string };
        req.userId = decoded.id;
        next();
    } catch {
        return res.status(403).json({
            message: "You are not logged in"
        });
    }
}