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

    ngOnInit(): void {
      if(this.auth.isAuthenticated$) {    
        this.auth.user$.subscribe({
          next: (res) => console.log(this.httpC.get(`http://localhost:3000/api/users/get/${res?.nickname}`).subscribe({
            next: (response) => {
              console.log('✅ API Response:', response);
            },
            error: (error) => {
              console.error('❌ API Error:', error);
            },
            complete: () => {
              console.log('Request complete');
            }
          }))
        });
      }
    }


  // ngOnInit(): void {
  //   this.auth.isAuthenticated$
  //     .pipe(
  //       filter((loggedIn) => loggedIn), // wait until user is logged in
  //       switchMap(() => this.auth.getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: 'https://dev-ee4ntnz0ben62qyp.us.auth0.com/api/v2/',
  //           scope: "openid profile email offline_access",
  //         },
  //       })),
  //       switchMap((token) => {
  //         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //         return this.httpC.get('http://localhost:3000/api/users/check', { headers });
  //       })
  //     )
  //     .subscribe({
  //       next: (res) => console.log('API response:', res),
  //       error: (err) => console.error('API error:', err),
  //     });
  // }
}