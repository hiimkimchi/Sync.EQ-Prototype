import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapPencil } from '@ng-icons/bootstrap-icons';
import { SynceqHeader } from '../../components/homeHeader/homeHeader.component';
import { VinylRecord } from '../../components/vinylRecord/vinylRecord.component';
import { InputField } from '../../components/inputField/inputField.component';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, NgIconComponent, InputField, SynceqHeader, VinylRecord],
  providers: [provideIcons({ bootstrapPencil })],
  templateUrl: './profile.component.html',
})
export class ProfilePage {
  title = 'profile-page';
  user?: User;
  isLoading? = true;
  error = '';
  username!: string;

  constructor(private userService: UserService,
              private route : ActivatedRoute
  ) {}

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username') ?? '';
    if (this.username) {
      this.fetchUser();
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

  onEditRoles() {
    console.log('Edit roles button clicked!');
    // Later you can open a modal or navigate to an edit form here
  }
}