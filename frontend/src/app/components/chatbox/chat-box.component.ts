// src/app/socket-test/socket-test.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEnvelope } from '@ng-icons/bootstrap-icons';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/users';
import { Message } from '../../models/message';
import { Chat } from '../../models/chat';

@Component({
  selector: 'chatbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-box.component.html',
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  @Input() user?: User = undefined;
  @Input() chat?: Chat = undefined;

  messages: Message[] = [];
  newMessage: string = '';
  private socketSub!: Subscription;

  constructor(
    private socketService: SocketService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges fired! chat =', this.chat);

    if (!this.chat?._id) {
      console.warn('cannot load messages');
      return;
    }

    this.loadMessages(this.chat._id);

    // sets up a new socket client on updates
    this.socketSub?.unsubscribe();
    this.socketSub = this.socketService
      .on<Message>('receiveMessage')
      .subscribe((msg) => {
        if (msg.chatID === this.chat?._id) {
          this.messages.push(msg);
        }
      });
  }

  loadMessages(chatId: string) {
    this.chatService.getUsersMessages(chatId).subscribe({
      next: (msgs: Message[]) => {
        this.messages = msgs.map((m) => ({
          ...m,
          createdAt: m.createdAt ? new Date(m.createdAt) : undefined,
        }));
        this.messages = this.messages.reverse();
      },
    });
  }

  sendMessage(): void {
    if (!this.chat?._id) {
      return;
    }
    if (!this.newMessage.trim()) return;

    const messagePayload: Message = {
      chatID: this.chat?._id,
      author: this.user?.username,
      content: this.newMessage,
    };

    this.socketService.send('message', messagePayload);
    this.newMessage = '';
  }

  ngOnDestroy(): void {
    if (this.socketSub) this.socketSub.unsubscribe();
    this.socketService.disconnect();
  }
}
