import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'profile-card',
  imports: [CommonModule],
  templateUrl: './profileCard.component.html',
})
export class ProfileCard {
    title = 'profile-card';
    @Input() card: any;

    constructor(private router: Router,
                private chatService: ChatService,
    ) {}

  routeToProfile(): void {
    this.router.navigate(['/profile', this.card.username]);
  }

  routeToChat() {
    this.router.navigate(["/chat"], {
      queryParams: {
          username: this.card.username,
      }
    });
  }
}