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

    this.userService.getProfile(this.searchText.trim()).subscribe({
      next: (user) => {
        if (user.username === this.currentUser?.username) {
          this.results = [];
          this.error = 'Cannot start chat with yourself';
        } else {
          this.results = [user];
          this.error = '';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Search error:', err);
        this.results = [];
        this.error = 'User not found';
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

