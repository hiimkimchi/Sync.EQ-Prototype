import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, SynceqHeader],
  templateUrl: './profile.component.html',
})
export class ProfilePage {
  title = 'profile-page';
  user?: User;
  isLoading? = true;
  error = '';
  @Input() username!: string;

  constructor(private userService: UserService) {}

  ngOnInit(){
    if (this.username) {
      this.fetchUser();
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
        console.error(err);
      },
    });
  }
}