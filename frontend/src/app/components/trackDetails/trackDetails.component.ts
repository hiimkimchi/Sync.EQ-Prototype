import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'track-details-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trackDetails.component.html',
  styleUrls: ['./trackDetails.component.css'],
})
export class TrackDetails {
  @Input() track: any = null;
  @Input() visible: boolean = false;
}
