import { Request, Response } from "express";
import Post from "../models/post.js";

export async function getAllPosts(req: Request, res: Response): Promise<any> {
	try {
		const posts = await Post.find().sort({ createdAt: -1 }).limit(20);
		if (posts.length === 0) {
			return res.status(404).json({ error: "No posts exist on Sync.EQ" });
		}
		return res.status(200).json(posts);
	} catch (err: any) {
		return res.status(400).json({ error: err.message });
	}
}

export async function getUsersPosts(req: Request, res: Response): Promise<any> {
	try {
		const posts = await Post.find({ author: req.params.username });
		if (posts.length === 0) {
			return res
				.status(404)
				.json({ error: "No posts found with associated user" });
		}
		return res.status(200).json(posts);
	} catch (err: any) {
		return res.status(400).json({ error: err.message });
	}
}

export async function getSpecificPost(
	req: Request,
	res: Response
): Promise<any> {
	try {
		const post = await Post.findOne({ postId: req.params.postId });
		if (!post) {
			console.log(`failed to find post w/ id: ${req.params.postId}`);
			return res.status(404).json({ error: "Post not found" });
		}
		return res.status(200).json(post);
	} catch (err: any) {
		return res.status(400).json({ error: err.message });
	}
}

export async function createPost(req: Request, res: Response): Promise<any> {
	try {
		const lastPost = await Post.findOne({author: req.body.author}).sort({
			postId: -1
		});
		const nextPostId = lastPost ? lastPost.postId + 1 : 1;
		const post = await Post.create({
			...req.body,
			postId: nextPostId
		});
		return res.status(201).json(post);
	} catch (err: any) {
		return res.status(400).json({ error: err.message });
	}
}

export async function updatePost(req: Request, res: Response): Promise<any> {
	try {
		const username = req.params.username;
		const postId = req.params.postId;

		const post = await Post.findOneAndUpdate(
			{ author: username, postId: Number(postId) },
			req.body,
			{ new: true }
		);

		if (!post) {
			return res.status(404).json({ message: "Post Not Found" });
		}
		return res.status(204).json(post);
	} catch (err: any) {
		return res.status(400).json({ error: err.message });
	}
}
