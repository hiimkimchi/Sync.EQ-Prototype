import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VinylRecord } from '../../components/vinylRecord/vinylRecord.component';
import { InputField } from '../../components/inputField/inputField.component';
import { ArrayInputField } from '../../components/arrayInputField/arrayInputField.component';
import { SelectInputField } from '../../components/selectInputField/selectInputField.component';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { MediaImageService } from '../../services/media/image.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    InputField,
    ArrayInputField,
    SelectInputField,
    VinylRecord
  ],
  templateUrl: './profile.component.html',

  animations: [
    // PROFILE → SLIDE OUT LEFT
    trigger('profileSlide', [
      state('visible', style({ 
        transform: 'translateX(0)', 
        opacity: 1,
        zIndex: 20
      })),
      state('hidden', style({ 
        transform: 'translateX(-150%)', 
        opacity: 0,
        zIndex: 20
      })),
      transition('visible <=> hidden', animate('600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'))
    ]),

    // VINYL → MOVE FROM RIGHT EDGE TO CENTER + SCALE UP + UNROTATE
    trigger('vinylSlide', [
      state('hidden', style({ 
        transform: 'translate(calc(-50% + 18vw), -50%)', 
        opacity: 1,
        zIndex: 0
      })),
      state('visible', style({ 
        transform: 'translate(-50%, -50%)', 
        opacity: 1,
        zIndex: 0
      })),
      transition('hidden <=> visible', animate('600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)'))
    ])
  ]
})
export class ProfilePage {
  title = 'profile-page';
  user?: User;
  isLoading? = true;
  isEditable? = false;
  error = '';
  username!: string;
  profilePicURL!: string;
  profilePicFile?: File;
  profilePicPreview: string | ArrayBuffer | null = null;


  vinylOpen: boolean = false;

  constructor(
    private userService: UserService,
    private mediaService: MediaImageService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') ?? '';
    if (this.username) {
      this.fetchUser();
      this.fetchProfilePic();

      if (this.auth.user$) {
        this.auth.user$.subscribe(authUser => {
          if (authUser && authUser.nickname === this.username) {
            this.isEditable = true;
          }
        });
      }
    }
  }

  toggleVinyl() {
    this.vinylOpen = !this.vinylOpen;
  }

  fetchUser() {
    this.isLoading = true;
    this.userService.getProfile(this.username).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Failed to load profile.';
        this.isLoading = false;
      },
    });
  }

  fetchProfilePic() {
    this.mediaService.getUserProfilePic(this.username).subscribe({
        next: (data) => {
            this.profilePicURL = data.url;
        },
        error: (err) => {
            console.error('Failed to fetch profile pic', err);
            this.profilePicURL = '';
        }
    });
  }

  updateUserField(field: string | undefined, value: string | string[]) {
    if (!this.user) return;
    if (!field || !value) return;

    const updatedUser = { ...this.user, [field]: value };

    this.userService.updateProfile(this.username, updatedUser).subscribe({
      next: data => {
        this.user = data;
        console.log('Profile updated successfully:', data);
        this.fetchUser();
      },
      error: err => {
        console.error('Failed to update profile:', err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    this.profilePicFile = file;

    // preview
    const reader = new FileReader();
    reader.onload = () => (this.profilePicPreview = reader.result);
    reader.readAsDataURL(file);
  }

  updateProfilePic() {
    if(!this.profilePicFile) return;

    this.mediaService.replaceUserProfilePic(this.username, this.profilePicFile).subscribe({
      next: (data) => {
          console.log("Profile pic uploaded:", data);
          this.fetchProfilePic();
          this.profilePicFile = undefined;
          this.profilePicPreview = null;
      },
      error: (err) => console.error("Profile pic upload error:", err),
    });
  }

  triggerFileInput(input: HTMLInputElement) {
    if (!this.isEditable) return;
    input.click();
  }
}
