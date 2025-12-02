import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service';
import { ChatBoxComponent } from '../../components/chatbox/chat-box.component';
import { ChatListComponent } from '../../components/chatlist/chat-list.component';
import { ChatService } from '../../services/chat.service';
import { Chat } from '../../models/chat';
import { User } from '../../models/users';
@Component({
  selector: 'chat-page',
  imports: [
    CommonModule,
    ChatBoxComponent,
    ChatListComponent,
  ],
  templateUrl: 'chat.component.html',
})
export class ChatPage implements OnInit {
  title = 'chat-page';
  chats: Chat[] = [];
  selectedChat?: Chat;
  user?: User;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute
  ) {}

  fetchUser(user?: string) {
    this.userService.getProfile(user).subscribe({
      next: (res) => {
        this.user = res;
        console.log(this.user);
      },
    });
  }

  onChatSelected(chat: Chat) {
    this.selectedChat = { ...chat };
  }

  // on initialization, will check if user is authenticated
  // if they aren't function will return
  // will then get user's profile & activate query parameters if needed
  // then will get the users chats and update all frontend utilities
  ngOnInit(): void {
    this.auth.user$?.subscribe((authUser) => {
      if (!authUser?.nickname) return;

      this.userService.getProfile(authUser.nickname).subscribe((profile) => {
        this.user = profile;

        this.activatedRoute.queryParams.subscribe((params) => {
          const otherUser = params['username'];
          if (otherUser && this.user?.username) {
            this.chatService
              .createChat(otherUser, this.user.username)
              .subscribe({
                next: (chat) => {
                  this.selectedChat = { ...chat };
                  this.chats = [chat, ...this.chats];
                },
                error: (err) => console.error('Error creating chat:', err),
              });
          }
        });

        this.chatService.getUsersChats(this.user.username).subscribe({
          next: (data) => {
            this.chats = Array.isArray(data)
              ? data
              : (data as any)?.chats ?? [];
          },
          error: (err) => console.error('Error fetching chats:', err),
        });
      });
    });
  }
}
