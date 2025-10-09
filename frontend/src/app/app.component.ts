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
  { image: 'https://media.licdn.com/dms/image/v2/D5603AQGYpyQ3-YpSaQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1672868194402?e=1762992000&v=beta&t=n_Du6Mdr0QgNpmpRY-sunEPhSIqmqIWvdpxBSNgUB3A', username: 'HiImKimchi', text: 'Sample card 1', genre: 'EDM' },
  { image: 'https://media.licdn.com/dms/image/v2/D5603AQHOeL3fYFhTZg/profile-displayphoto-crop_800_800/B56ZhTCdBDHUAM-/0/1753739813067?e=1762992000&v=beta&t=LCIPBV_9a5kRZh-5FQrW2iR-Gu1a9BZrELtBG8lQhC4', username: 'Samuriot', text: 'Sample card 1', genre: 'K-Pop' },
  { image: 'https://media.licdn.com/dms/image/v2/D4E03AQGzc6TDDLuE5g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691470054000?e=1762992000&v=beta&t=B1g_IaYEyb69PvJ8GHl0LXVwa9VA_pWloP2wfD958bo', username: 'BADevera04', text: 'Sample card 1', genre: 'RnB' },
  ];
}
