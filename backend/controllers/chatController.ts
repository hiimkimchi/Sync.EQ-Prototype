import Chat from "../models/chat";
import { Request, Response } from "express";

export async function getAllChats(req: Request, res: Response) {
	try {
		const chats = await Chat.find();
		if (chats.length === 0) {
			return res.status(404).json({ error: "No Chats Found In DB" });
		}
		return res.status(200).json(chats);
	} catch (err: any) {
		return res.status(400).json({ error: err.message });
	}
}

export async function getSpecificUsersChats(req: Request, res: Response) {
    const username = req.params.username;
	try {
		const chats = await Chat.find({
			$or: [{ user1: username }, { user2: username }],
		});
        if(chats.length === 0) {
            return res.status(404).json({error: "No chats for specific user found"});
        }
        return res.status(200).json(chats);
	} catch (err: any) {
		return res.status(400).json({ error: err.message });
	}
}
