import Post from "../models/post.js"

export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find();
        if(posts.length === 0) {
            return res.status(404).json({ error: "No posts exist on Sync.EQ" });
        }
        res.status(200).json(posts);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

export async function getUsersPosts(req, res) {
    try {
        const posts = await Post.find({ author: req.params.username });
        if(posts.length === 0) {
            return res.status(404).json({ error: "No posts found with associated user" });
        }
        res.status(200).json(posts);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

export async function getSpecificPost(req, res) {
    try {
        const post = await Post.findById(req.params.postId);
        if(!post) {
            console.log(`failed to find post w/ id: ${req.params.postId}`)
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

export async function createPost(req, res) {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch(err) {
        res.status(400).json({error: err.message});
    } 
}