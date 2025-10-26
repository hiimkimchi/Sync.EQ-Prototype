import express from "express";
import Post from "../models/post.js";
import { jwtCheck } from "../middleware/auth.js";
const app = express.Router();

//create a post
app.post("/", async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch(err) {
        res.status(400).json({error: err.message});
    } 
});

//get a post via unique post_id
app.get("/:username/:post_id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post) {
            console.log(`failed to find user of name: ${req.params.post_id}`)
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});

//get all posts from 1 user
app.get("/:username", async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.username });
        if(!posts) {
            return res.status(404).json({ error: "No user found" });
        }
        res.status(200).json(posts);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});

//get all posts ever
app.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        if(!posts) {
            return res.status(404).json({ error: "No posts exist on Sync.EQ" });
        }
        res.status(200).json(posts);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
});


export default app;