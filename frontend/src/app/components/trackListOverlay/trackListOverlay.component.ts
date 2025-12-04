import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackDetails } from '../trackDetails/trackDetails.component';

@Component({
  selector: 'track-list-overlay',
  standalone: true,
  imports: [CommonModule, TrackDetails],
  templateUrl: './trackListOverlay.component.html',
  styleUrls: ['./trackListOverlay.component.css']
})
export class TrackListOverlay {
  @Input() isVisible = false;
  @Output() trackSelected = new EventEmitter<any>();

  tracks = [
    { title: "Moonlight Drive", duration: "3:24", fileType: "mp3", size: "5.3 MB", genre: "Synthwave" },
    { title: "Electric Dreams", duration: "4:02", fileType: "wav", size: "28 MB", genre: "Electronic" },
    { title: "Neon Skyline", duration: "2:58", fileType: "mp3", size: "4.8 MB", genre: "Chillwave" },
    { title: "Parallel Motion", duration: "3:45", fileType: "aac", size: "6.1 MB", genre: "Ambient" },
    { title: "Sunset Memories", duration: "3:14", fileType: "mp3", size: "5.0 MB", genre: "Lofi" },
    { title: "Caca", duration: "3:14", fileType: "mp3", size: "5.0 MB", genre: "Lofi" }
  ];

  selectedIndex = 0;
  selectedTrack: any = null;

  selectTrack(i: number) {
    this.selectedIndex = i;
    this.selectedTrack = this.tracks[i];
    this.trackSelected.emit(this.selectedTrack);
  }
}
