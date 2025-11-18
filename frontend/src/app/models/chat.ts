import { Message } from "./message";

export interface Chat {
    _id?: String,
    user1?: String,
    user2?: String,
    recentMessage?: Message
}

export interface ChatHistory {
    _id?: String,
    messages?: Message[]
}