import { Request, Response } from "express";
import User from "../models/user.js";

export async function authenticateUser(req: any, res: Response) {
    console.log("connection received");
    try {
        const auth0ID = req.auth.payload.sub; 
        let user = await User.findOne({ auth0ID });
        if (!user) {
            console.log("user not found")
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ error: "Server failed, Try Again Later" });
    }
}