import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHouse, bootstrapListUl } from '@ng-icons/bootstrap-icons';
import { AuthButtonComponent } from '../AuthButtonComponent/AuthButtonComponent.component';
import { SearchBar } from '../searchBar/searchBar.component';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../../models/users';
import { Router } from '@angular/router';
import { MediaImageService } from '../../services/media/image.service';


@Component({
  selector: 'synceq-header',
  imports: [CommonModule, NgIconComponent, RouterModule, AuthButtonComponent, SearchBar],
  providers: [provideIcons({ bootstrapListUl, bootstrapHouse })],
  templateUrl: './homeHeader.component.html',
  styleUrls: ['./homeHeader.component.css'],
})
export class SynceqHeader {
  title = 'synceq-header';
  auth0Info = {} as User;
  isLoggedIn = false;
  profilePicURL!: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private mediaService: MediaImageService,
  ) { };

  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe({
        next: (res) => {
          this.auth0Info.username = res?.nickname;
          this.fetchProfilePic()
          this.isLoggedIn = true
        }
      });
    }
  }

  ngOnChanges(): void {

  }
  
  fetchProfilePic() {
    this.mediaService.getUserProfilePic(this.auth0Info.username).subscribe({
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

  routeToProfile(): void {
    this.router.navigate(['/profile', this.auth0Info.username]);
  }
}