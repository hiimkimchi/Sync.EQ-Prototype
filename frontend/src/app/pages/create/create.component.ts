import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-create-profile',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: 'create.component.html',
    standalone: true
})

export class CreatePage implements OnInit {
    title = 'create-profile';
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