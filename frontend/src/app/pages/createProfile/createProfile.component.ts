import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { userInfo } from 'os';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'createProfile.component.html',
  // template: `
  //   <ul *ngIf="auth.user$ | async as user">
  //     <li>{{ user.sub }}</li>
  //     <li>{{ user.name }}</li>
  //     <li>{{ user.nickname }}</li>
  //     <li>{{ user.email }}</li>
  //     <li>{{ user.email_verified }}</li> 
  //   </ul>`,
  standalone: true
})

export class CreateProfilePage implements OnInit{
    title = 'create-profile-dashboard';
    createAcc: FormGroup;
    auth0Info: any;

    constructor(private httpC: HttpClient,
                private router: Router,
                public auth: AuthService,
                private createF: FormBuilder
    ) {
      this.createAcc = this.createF.group({
        artistAlias: [''],
        profession: [''],
        genre: [''],
        biography: [''],
        phone_num: [''],
        daws: [''],
        social_media: [''],
      })
    }
    
    // initiates when a page is loaded
    ngOnInit(): void {
      if(this.auth.isAuthenticated$) {    
        this.auth.user$.subscribe({
          next: (res) => {
            this.auth0Info = res;
            this.httpC.get(`http://localhost:3000/api/users/get/${res?.nickname}`).subscribe({
              next: (response) => {
                this.router.navigateByUrl("/profile");
              },
              error: (error) => {
                console.log("creating profile");  
              },
            })
        }});
      }
    }

    onSubmit(): void {
      const formData = this.createAcc.value;
      const accountPayload = {
        ...formData,
        auth0id: this.auth0Info?.sub,
        email: this.auth0Info?.email,
        _id: this.auth0Info?.nickname,
        social_media: { twitter: formData.social_media },
      };

      this.httpC.post('http://localhost:3000/api/users/', accountPayload).subscribe({
        next: (response) => {
          console.log('Server Response:', response);
          this.router.navigateByUrl("/profile");
        },
        error: (error) => {
          console.error('Error submitting form:', error);
        }
      });
    }
}