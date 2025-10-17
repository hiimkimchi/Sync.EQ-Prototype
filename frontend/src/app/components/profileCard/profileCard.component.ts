import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'profile-card',
  imports: [CommonModule],
  templateUrl: './profileCard.component.html',
})
export class ProfileCard {
    title = 'profile-card';
    @Input() card: any;
}