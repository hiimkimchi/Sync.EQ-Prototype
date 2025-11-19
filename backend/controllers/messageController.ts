import Message from "../models/message";
import Chat from "../models/chat"
import { Request, Response } from "express";

export async function getUserMessages(req: Request, res: Response): Promise<any> {
    try {
        const user = req.params.username;
        const messages = await Message.find({username: user});
        if(messages.length === 0) {
            return res.status(404).json({error: "no messages found for given user"});
        }
        return res.status(200).json(messages);
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}

export async function getMessagesInChat(req: Request, res: Response) {
    try {
        const chatId = req.params.chatId;
        const messages = await Message.find({chatID: chatId}).sort({createdAt: -1});
        if(messages.length === 0) {
            return res.status(404).json({error: "No messages found"});
        }
        return res.status(200).json(messages);
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}

export async function sendMessage(req: Request, res: Response) {
    try {
        const chatId = req.params.chatId;
        const message = await Message.create({
            ...req.body,
            chatID: chatId
        });
        if(!message) {
            return res.status(400).json({error: "error creating message"});
        }
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            {$set: {recentMessage: message._id}},
            {new: true}
        );
        if(!chat) {
            return res.status(400).json({error: "error updating chat"});
        }
        return res.status(201).json({chat, message});
    } catch(err: any) {
        return res.status(400).json({error: err.message});
    }
}