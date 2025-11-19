import { Message } from "./message";

export interface Chat {
    _id?: string,
    user1?: string,
    user2?: string,
    recentMessage?: Message
}

export interface ChatHistory {
    _id?: String,
    messages?: Message[]
}