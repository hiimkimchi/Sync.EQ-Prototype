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
        if(this.auth.isAuthenticated$) {    
            this.auth.user$.subscribe({
                next: (res) => {
                this.httpC.get(`http://localhost:3000/api/users/get/${res?.nickname}`).subscribe({
                    next: (response) => {
                        this.router.navigateByUrl("/");
                    },
                    error: (error) => {
                        this.router.navigateByUrl("/create");  
                    },
                })
                }
            });
        }
    }
}