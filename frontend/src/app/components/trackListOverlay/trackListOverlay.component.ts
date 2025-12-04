import { Component, EventEmitter, Output, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackDetails } from '../trackDetails/trackDetails.component';
import { MediaAudioService } from '../../services/media/audio.service';
import { Media } from '../../models/media';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'track-list-overlay',
  standalone: true,
  imports: [CommonModule, TrackDetails],
  templateUrl: './trackListOverlay.component.html',
  styleUrls: ['./trackListOverlay.component.css']
})
export class TrackListOverlay implements OnInit {
  @Input() isVisible = false;
  @Input() isEditable? = false;
  @Output() trackSelected = new EventEmitter<any>();
  @ViewChild('fileInput') fileInput?: ElementRef;

  tracks: Media[] = [];
  selectedIndex = 0;
  selectedTrack: Media | null = null;
  isUploading = false;
  currentUsername = '';
  

  constructor(
    private audioService: MediaAudioService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadUserAudio();
  }

  loadUserAudio() {
    // If we already have the username (e.g. after upload), fetch directly
    if (this.currentUsername) {
      this.audioService.getUserAudio(this.currentUsername).subscribe({
        next: (response: any) => {
          this.tracks = Array.isArray(response) ? response : (response?.audio || []);
        },
        error: () => {
          this.tracks = [];
        }
      });
      return;
    }

    if (!this.auth.user$) {
      return;
    }

    this.auth.user$.subscribe((user) => {
      if (user?.sub) {
        this.currentUsername = user.sub.split('|')[1];
        this.audioService.getUserAudio(this.currentUsername).subscribe({
          next: (response: any) => {
            // Handle array or single object response
            this.tracks = Array.isArray(response) ? response : (response?.audio || []);
          },
          error: () => {
            this.tracks = [];
          }
        });
      }
    });
  }

  selectTrack(i: number) {
    this.selectedIndex = i;
    this.selectedTrack = this.tracks[i];
    this.trackSelected.emit(this.selectedTrack);
  }

  onAddAudioClick() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      const file = files[0];
      this.uploadAudio(file);
    }
  }

  uploadAudio(file: File) {
    if (!this.currentUsername) {
      return;
    }

    this.isUploading = true;
    this.audioService.createUserAudio(this.currentUsername, file).subscribe({
      next: (_response: Media) => {
        this.isUploading = false;
        // Refresh the track list after upload
        this.loadUserAudio();
        // Reset file input
        if (this.fileInput?.nativeElement) {
          this.fileInput.nativeElement.value = '';
        }
      },
      error: () => {
        this.isUploading = false;
        // Reset file input
        if (this.fileInput?.nativeElement) {
          this.fileInput.nativeElement.value = '';
        }
      }
    });
  }
}
