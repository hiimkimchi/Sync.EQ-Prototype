import { Request, Response } from "express";
import User from "../models/user.js";

export async function getUsers(req: Request, res: Response) {
    try {
        const users = await User.find();
        if(users.length === 0) {
            return res.status(404).json({ error: "No users in db" });
        }
        res.status(200).json(users);
    } catch(err: any) {
        res.status(400).json({error: err.message});
    }
}

export async function getSpecificUsers(req: Request, res: Response) {
    try {
        const genre = req.query.genre
        const professions = req.query.professions
        const search = req.query.search
        const filters: { [key: string]: any } = {}

        if (genre) filters.genres = genre
        if (professions) filters.professions = professions
        if (search) filters.search = search

        const users = await User.find(filters)
        if (users.length === 0) {
            return res.status(404).json({error: "No users in db"});
        }
        res.status(200).json(users);
    } catch (err: any) {
        res.status(400).json({error: err.message})
    }
}

export async function getSpecificUser(req: Request, res: Response) {
    try {
        const user = await User.findOne({ username: req.params.username });
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch(err: any) {
        res.status(400).json({error: err.message});
    }
}

export async function updateSpecificUser(req: Request, res: Response) {
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            req.body,
            { new: true }
        );
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(204).json(user);
    } catch(err: any) {
        res.status(400).json({error: err.message});
    }
}

export async function createUser(req: Request, res: Response) {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch(err: any) {
        res.status(400).json({error: err.message});
    } 
}