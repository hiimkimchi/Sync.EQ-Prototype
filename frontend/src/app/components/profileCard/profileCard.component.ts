import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { MediaImageService } from '../../services/media/image.service';

@Component({
  selector: 'profile-card',
  imports: [CommonModule],
  templateUrl: './profileCard.component.html',
})
export class ProfileCard implements OnInit {
    title = 'profile-card';
    profilePicURL: string = ""
    @Input() card: any;

    constructor(private router: Router,
                private chatService: ChatService,
                private mediaService: MediaImageService
    ) {
    }

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

  fetchProfilePic() {
    this.mediaService.getUserProfilePic(this.card.username).subscribe({
      next: (data) => {
        console.log(data.url);
        this.profilePicURL = data.url;
      },
      error: (err) => {
        console.error('Failed to fetch profile pic', err);
        this.profilePicURL = '';
      }
    });
  }

  ngOnInit(): void {
      this.fetchProfilePic();
  }
}