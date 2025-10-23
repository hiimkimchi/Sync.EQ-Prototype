import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { filter, switchMap } from 'rxjs';

// @Component({
//   selector: 'create-profile-dashboard',
//   imports: [CommonModule],
//   templateUrl: './createProfile.component.html',
// })


@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  template: `
    <ul *ngIf="auth.user$ | async as user">
      <li>{{ user.sub }}</li>
      <li>{{ user.name }}</li>
      <li>{{ user.nickname }}</li>
      <li>{{ user.email }}</li>
      <li>{{ user.email_verified }}</li> 
    </ul>`,
  standalone: true
})

export class CreateProfilePage implements OnInit{
    title = 'create-profile-dashboard';

    constructor(private httpC: HttpClient,
                private router: Router,
                public auth: AuthService
    ) {}
    
    // initiates when a page is loaded
    // asked chatgpt for "Performing API requests from Angular to Express Backend" for guidance on how to perform api calls
    ngOnInit(): void {
      if(this.auth.isAuthenticated$) {    
        this.auth.user$.subscribe({
          next: (res) => console.log(this.httpC.get(`http://localhost:3000/api/users/get/${res?.nickname}`).subscribe({
            next: (response) => {
              console.log('Response:', response);
            },
            error: (error) => {
              console.error('Error:', error);
            },
          }))
        });
      }
    }
}