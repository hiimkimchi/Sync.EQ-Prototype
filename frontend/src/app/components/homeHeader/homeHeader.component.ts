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
import { UserService } from '../../services/user.service';


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

  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
  ) { };

  ngOnInit(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe({
        next: (res) => {
          this.auth0Info.username = res?.nickname;
        }
      });
      // this.userService.getProfile(this.auth0Info.username).subscribe({
      // });
    }
  }

  routeToProfile(): void {
    this.router.navigate(['/profile', this.auth0Info.username]);
  }
}