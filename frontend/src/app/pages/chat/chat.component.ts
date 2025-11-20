import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service';
import { ChatBoxComponent } from '../../components/chatbox/chat-box.component';
import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { SynceqFooter } from '../../components/homeFooter/homeFooter.component';
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
    SynceqHeader,
    SynceqFooter,
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
    private httpC: HttpClient,
    private router: Router,
    private userService: UserService,
    private chatService: ChatService,
  ) {
  }

  fetchUser(user?: string) {
    this.userService.getProfile(user).subscribe({
        next: (res) => {
            this.user = res;
            console.log(this.user);
        }
    })
  }

  onChatSelected(chat : Chat) {
    this.selectedChat = chat;
  }

  // initiates when a page is loaded
  ngOnInit(): void {
    // ensure user is authenticated
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe({
        next: (res) => {
            this.fetchUser(res?.nickname);
        },
      });
    } else {
      this.router.navigateByUrl("/create");
    }

    // gets a users chats to send to userList
    this.chatService.getUsersChats(this.user?.username).subscribe({
      next: (data) => {
        console.log('API chat data:', data);

        // Ensure it's an array
        if (Array.isArray(data)) {
          this.chats = data;
        } else if (data && Array.isArray((data as any).chats)) {
          this.chats = (data as any).chats;
        } else {
          this.chats = [];
        }
      },
      error: (err) => console.error('Error fetching chats:', err),
    });
  }
}
