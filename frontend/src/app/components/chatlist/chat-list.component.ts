// src/app/socket-test/socket-test.component.ts
import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEnvelope } from '@ng-icons/bootstrap-icons';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/users';
import { Chat } from '../../models/chat';

@Component({
  selector: 'chatlist',
  imports: [CommonModule, FormsModule, NgIconComponent],
  providers: [provideIcons({ bootstrapEnvelope })],
  templateUrl: './chat-list.component.html',
  standalone: true,
})

export class ChatListComponent implements OnInit, OnDestroy {
  @Input() user?: User;
  @Input() chats: Chat[] = [];
  @Output() chatSelected = new EventEmitter<Chat>();

  constructor() {
    console.log("chats: ", this.chats);
  }

  selectChat(chat: Chat) {
    this.chatSelected.emit(chat);
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {}
}
