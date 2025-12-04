import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaAudioService } from '../../services/media/audio.service';

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
  @Input() username? = '';
  isDownloading = false;

  constructor(private audioService: MediaAudioService) {}

  downloadTrack() {
    if (!this.track || !this.username) {
      return;
    }

    this.isDownloading = true;
    this.audioService.getUserAudioFile(this.username, this.track.filePath).subscribe({
      next: (response: any) => {
        // response contains url property with SAS URL
        const sasUrl = response.url;
        // Create a temporary link and trigger download
        const link = document.createElement('a');
        link.href = sasUrl;
        link.download = this.track.filePath || 'audio-file';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.isDownloading = false;
      },
      error: () => {
        this.isDownloading = false;
      }
    });
  }
}
