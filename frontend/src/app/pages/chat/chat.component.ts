import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../../services/user.service';
import { ChatBoxComponent } from '../../components/chatbox/chat-box.component';

@Component({
    selector: 'chat-page',
    imports: [CommonModule, ChatBoxComponent],
    templateUrl: 'chat.component.html',
})

export class ChatPage implements OnInit {
    title = 'chat-page';

    constructor(private auth:AuthService, 
                private httpC: HttpClient,
                private router: Router,
                private userService: UserService
    ) {}

    // initiates when a page is loaded
    ngOnInit(): void {

    }
}

