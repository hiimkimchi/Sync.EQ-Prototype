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

@Component({
  selector: 'app-profile',
  imports: [CommonModule, InputField, ArrayInputField, SelectInputField, VinylRecord],
  templateUrl: './profile.component.html',
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


  constructor(private userService: UserService,
              private mediaService: MediaImageService,
              private auth: AuthService,
              private route : ActivatedRoute
  ) {}

  ngOnInit(){
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
    } else {
    }
  }

  fetchUser() {
    this.isLoading = true;
    this.userService.getProfile(this.username).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
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
      next: (data) => {
        this.user = data;
        console.log('Profile updated successfully:', data);
        this.fetchUser()
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
      },
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