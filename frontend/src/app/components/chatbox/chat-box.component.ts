// src/app/socket-test/socket-test.component.ts
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapEnvelope } from '@ng-icons/bootstrap-icons';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/users';

@Component({
  selector: 'chatbox',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-box.component.html',
})

export class ChatBoxComponent implements OnInit, OnDestroy {
  @Input() user? : User = undefined;
  messages: string[] = [];

  // private socketSub!: Subscription;

  constructor(private socketService: SocketService,
              private chatService: ChatService
  ) {}

  ngOnInit(): void {

    // this.chatService.getUsersChats(this.user?.username).subscribe({
    //   next: (data) => {
        
    //   }
    // });
    // this.socketSub = this.socketService.on<string>('receiveMessage').subscribe((msg) => {
    //   this.messages.push(msg);
    // });
  }

  // sendMessage(message: string): void {
  //   this.socketService.send('message', message); 
  // }

  ngOnDestroy(): void {
    // if (this.socketSub) this.socketSub.unsubscribe();
    // this.socketService.disconnect();
  }
}
