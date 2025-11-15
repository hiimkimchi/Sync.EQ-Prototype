import express from "express";
import chat from "../models/chat";
const app = express.Router();
import * as cc from "../controllers/chatController"
import * as mc from "../controllers/messageController"

app.get("/", cc.getAllChats);
app.get("/user/:username", cc.getSpecificUsersChats);
app.get("/:chatId", cc.getChatById);

app.post("/", cc.createChat);

app.get("/:chatId/messages", mc.getMessagesInChat);
app.post("/:chatId/messages", mc.sendMessage);