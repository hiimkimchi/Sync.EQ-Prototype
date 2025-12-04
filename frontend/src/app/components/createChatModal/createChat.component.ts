import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/users';
import { Chat } from '../../models/chat';

@Component({
  selector: 'create-chat-modal',
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [],
  templateUrl: './createChat.component.html',
})

export class CreateChatModal {
  @Input() currentUser?: User;
  @Output() closed = new EventEmitter<void>();
  @Output() created = new EventEmitter<Chat>();

  searchText = '';
  results: User[] = [];
  loading = false;
  error = '';

  constructor(private userService: UserService, private chatService: ChatService) {}

  closeModal() {
    this.closed.emit();
  }

  searchUsers() {
    if (!this.searchText || this.searchText.trim().length === 0) {
      this.results = [];
      this.error = '';
      return;
    }
    this.loading = true;
    this.error = '';

    this.userService.getAllProfiles().subscribe({
      next: (users) => {
        this.results = users.filter(u => 
          u.username?.toLowerCase().includes(this.searchText.toLowerCase()) &&
          u.username !== this.currentUser?.username
        );
        this.loading = false;
        if (this.results.length === 0) {
          this.error = 'No users found';
        }
      },
      error: (err) => {
        console.error('Search error:', err);
        this.error = 'Search failed';
        this.loading = false;
      }
    });
  }

  startChat(withUser: User) {
    const user1 = this.currentUser?.username;
    const user2 = withUser.username;
    if (!user1 || !user2) {
      this.error = 'Missing current user or selected user';
      return;
    }
    this.chatService.createChat(user1, user2).subscribe({
      next: (chat) => {
        this.created.emit(chat);
        this.closeModal();
      },
      error: (err) => {
        this.error = 'Could not create chat';
      }
    })
  }
}

