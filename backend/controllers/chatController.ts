import Chat from "../models/chat";
import { Request, Response } from "express";

async function checkChatExistence(req: Request) {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const chats = await Chat.find({
        $or: [
            { user1: user1, user2: user2 }, 
            { user1: user2, user2: user1 }
        ],
    });
    if(chats.length === 0) {
        return false;
    }
    return true;
}

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

export async function getChatById(req: Request, res: Response) {
    const chatId = req.params.chatId;
    try {
        const chat = await Chat.findOne({_id: chatId});
        if(!chat) {
            return res.status(404).json("No Chat Found With Specified ID");
        }
        return res.status(200).json(chat);
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}

export async function createChat(req: Request, res: Response) {
    try {
        const result = await checkChatExistence(req);
        if(result) {
            return res.status(400).json({error: "Chat Already Exists"});
        }
        const chat = await Chat.create(req.body);
        res.status(201).json(chat);
    } catch(err: any) {
        res.status(400).json({error: err.message});
    } 
}
