import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AuthService } from '@auth0/auth0-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ENV } from '../../core/environment';

@Component({
    selector: 'app-create-profile',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: 'callback.component.html',
    standalone: true
})

export class CallbackPage implements OnInit {
    title = 'create-profile';

    constructor(private auth:AuthService, 
                private httpC: HttpClient,
                private router: Router,
    ) {}

    // initiates when a page is loaded
    ngOnInit(): void {
        const api_url = ENV.apiUrl + "api/users/get";
        
        if(this.auth.isAuthenticated$) {    
            this.auth.user$.subscribe({
                next: (res) => {
                    this.httpC.get(`${api_url}/${res?.nickname}`).subscribe({
                        next: (response) => {
                            this.router.navigateByUrl("/");
                        },
                        error: (error) => {
                            if(error.status === 404) {
                                this.router.navigateByUrl("/create");  
                            }
                        },
                    })
                }
            });
        }
    }
}