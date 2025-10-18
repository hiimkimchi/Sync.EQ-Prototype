import express from "express";
import User from "../models/user.js";
const app = express.Router();

// create a user
app.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(err) {
        res.status(400).json({error: err.message});
    } 
});

// find a specific user
app.get("/:username", async (req, res) => {
    try {
        const user = await User.findById(req.params.username);
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});

export default app;