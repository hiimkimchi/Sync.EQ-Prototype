import { Message } from "./message";

export interface Chat {
    _id?: String,
    _user1?: String,
    _user2?: String,
    recentMessage?: Message
}

export interface ChatHistory {
    _id?: String,
    messages?: Message[]
}