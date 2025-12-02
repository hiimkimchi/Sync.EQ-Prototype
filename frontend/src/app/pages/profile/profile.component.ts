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

@Component({
  selector: 'app-profile',
  imports: [CommonModule, InputField, ArrayInputField, SelectInputField, VinylRecord],
  templateUrl: './profile.component.html',
})
export class ProfilePage {
  title = 'profile-page';
  user?: User;
  isLoading? = true;
  error = '';
  username!: string;
  profilePicURL!: string;

  constructor(private userService: UserService,
              private mediaService: MediaImageService,
              private route : ActivatedRoute
  ) {}

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username') ?? '';
    if (this.username) {
      this.fetchUser();
      this.fetchProfilePic();
    } else {
      console.log("nothing found");
    }
  }

  fetchUser() {
    this.isLoading = true;
    this.userService.getProfile(this.username).subscribe({
      next: (data) => {
        console.log(data);
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  fetchProfilePic() {
    this.mediaService.getUserProfilePic(this.username).subscribe({
        next: (data) => {
            console.log(data.url);
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
}