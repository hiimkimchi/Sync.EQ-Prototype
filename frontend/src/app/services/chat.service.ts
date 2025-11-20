import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message';
import { ENV } from '../core/environment';
import { Chat } from '../models/chat';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private baseUrl = `${ENV.apiUrl}api/chats`;

    constructor(private http: HttpClient) { }

    createChat(user1: string, user2: string) {
        return this.http.post<Chat>(`${this.baseUrl}/`, {
            user1: user1,
            user2: user2
        });
    }

    getUsersChats(user?: string) :Observable<Chat[]> {
        return this.http.get<Chat[]>(`${this.baseUrl}/user/${user}`);
    }

    getUsersMessages(chatID: string): Observable<Message[]> {
        return this.http.get<Message[]>(`${this.baseUrl}/${chatID}/messages`);
    }
}
