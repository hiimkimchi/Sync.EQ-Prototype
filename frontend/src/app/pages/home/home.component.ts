import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapMusicNoteBeamed } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgIconComponent],
  providers: [provideIcons({ bootstrapMusicNoteBeamed })],
  templateUrl: './home.component.html',
})
export class HomePage {
    title = 'home-page';
    cards = [
        { image: 'assets/images/bryan.jpg', username: 'HiImKimchi', genre: 'EDM' },
        { image: 'assets/images/jomi.jpg', username: 'Samuriot', genre: 'K-Pop' },
        { image: 'assets/images/ben.jpg', username: 'BADevera04', genre: 'RnB' },
    ];
}