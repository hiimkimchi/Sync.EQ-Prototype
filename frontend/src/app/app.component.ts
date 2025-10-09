import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'synceq';
  cards = [
    { image: 'assets/images/bryan.jpg', username: 'HiImKimchi', genre: 'EDM' },
    { image: 'assets/images/jomi.jpg', username: 'Samuriot', genre: 'K-Pop' },
    { image: 'assets/images/ben.jpg', username: 'BADevera04', genre: 'RnB' },
  ];
}
