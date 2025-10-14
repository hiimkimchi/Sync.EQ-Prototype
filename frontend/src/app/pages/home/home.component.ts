import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomePage {
    title = 'home-page';
    cards = [
        { image: 'assets/images/bryan.jpg', username: 'HiImKimchi', genre: 'EDM' },
        { image: 'assets/images/jomi.jpg', username: 'Samuriot', genre: 'K-Pop' },
        { image: 'assets/images/ben.jpg', username: 'BADevera04', genre: 'RnB' },
    ];
}