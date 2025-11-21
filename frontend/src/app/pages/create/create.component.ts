import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ENV } from '../../core/environment'


@Component({
    selector: 'app-create-profile',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: 'create.component.html',
    standalone: true
})

export class CreatePage implements OnInit {
    title = 'create-profile';
    createAcc: FormGroup;
    profilePicFile?: File;
    profilePicPreview: string | ArrayBuffer | null = null;
    auth0Info: any;

    constructor(private httpC: HttpClient,
        private router: Router,
        public auth: AuthService,
        private createF: FormBuilder
    ) {
        this.createAcc = this.createF.group({
            artistAlias: [''],
            username: [''],
            professions: [''],
            genres: [''],
            biography: [''],
            phone_num: [''],
            daws: [''],
            social_media: [''],
        })
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


    // initiates when a page is loaded
    ngOnInit(): void {
        if (this.auth.isAuthenticated$) {
            this.auth.user$.subscribe({
                next: (res) => {
                    this.auth0Info = res;
                }
            });
        }
    }

    onSubmit(): void {
        const api_url = ENV.apiUrl + "api/users/";
        const formData = this.createAcc.value;

        const accountPayload = {
            ...formData,
            auth0id: this.auth0Info?.sub,
            email: this.auth0Info?.email,
            username: this.auth0Info?.nickname,
            social_media: { twitter: formData.social_media },
        };

        // STEP 1 — Create the user account
        this.httpC.post(api_url, accountPayload).subscribe({
            next: (response: any) => {
                console.log("User created:", response);

                const username = this.auth0Info?.nickname;

                if (this.profilePicFile) {
                    // STEP 2 — Upload profile picture
                    const picUrl = `${ENV.apiUrl}api/media/${username}/profilepic`;

                    const fd = new FormData();
                    fd.append("author", username);
                    fd.append("file", this.profilePicFile);

                    this.httpC.post(picUrl, fd).subscribe({
                        next: (res) => {
                            console.log("Profile pic uploaded:", res);
                            this.router.navigateByUrl(`/`);
                        },
                        error: (err) => console.error("Profile pic upload error:", err),
                    });

                } else {
                    // no profile pic → just redirect
                    this.router.navigateByUrl(`/`);
                }
            },
            error: (error) => {
                console.error("Error submitting form:", error);
            }
        });
    }
}