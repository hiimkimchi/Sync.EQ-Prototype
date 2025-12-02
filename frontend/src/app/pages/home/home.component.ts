import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapMusicNoteBeamed } from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../../models/users';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapMusicNoteBeamed })],
  templateUrl: './home.component.html',
})
export class HomePage implements OnInit {
    title = 'home-page';
    auth0Info = {} as User ;
    cards = [
        { image: 'assets/images/bryan.jpg', username: 'HiImKimchi', genre: 'EDM' },
        { image: 'assets/images/jomi.jpg', username: 'Samuriot', genre: 'K-Pop' },
        { image: 'assets/images/ben.jpg', username: 'BADevera04', genre: 'RnB' },
    ];
    
    constructor(private router : Router,
                private auth : AuthService
    ) {};

    ngOnInit(): void {
      if(this.auth.isAuthenticated$) {    
        this.auth.user$.subscribe({
          next: (res) => {
            this.auth0Info.username = res?.nickname;
          }
        });
      }
    }

    routeToProfile(): void {
      this.router.navigate(['/profile', this.auth0Info.username]);
    }

    routeToExplore(): void {
      this.router.navigate(['/explore']);
    }
}