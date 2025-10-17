import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapMusicNoteBeamed } from '@ng-icons/bootstrap-icons';
import { ProfileCard } from '../../components/profileCard/profileCard.component';
import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { SynceqFooter } from '../../components/homeFooter/homeFooter.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, NgIconComponent, ProfileCard, SynceqHeader, SynceqFooter],
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