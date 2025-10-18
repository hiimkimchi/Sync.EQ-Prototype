import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface VinylProfile {
  _id?: string;
  artistName: string;
  title?: string;
  handle?: string;
  bio?: string;
  coverColor?: string;
  socials?: SocialLink[];
  profession?: string;
  genres?: string[];
  phone_num?: string;
  email?: string;
  daws?: string[];
  external_visits?: string[];
  profile_pic?: string | ArrayBuffer | null;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, SynceqHeader],
  templateUrl: './profile.component.html',
})
export class ProfilePage {
  title = 'profile-page';
  @Input() profile: VinylProfile = {
    _id: 'user_123',
    artistName: 'Artist Name',
    title: 'Album Title',
    handle: '@example',
    bio: 'Hello Jomikael Gutierrez Ruiz and Benjamin Arthur DeVera and Bryan SooHan Kim',
    socials: [
      { platform: 'Instagram', url: 'https://instagram.com' },
      { platform: 'SoundCloud', url: 'https://soundcloud.com' }
    ],
    profession: 'Producer',
    genres: ['Electronic'],
    phone_num: '+1-555-555-5555',
    email: 'artist@example.com',
    daws: ['Ableton Live', 'FL Studio'],
    external_visits: ['https://example.com/press', 'https://example.com/tour'],
    profile_pic: null,
  };
}