import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapSearch, bootstrapHouse, bootstrapListUl } from '@ng-icons/bootstrap-icons';
import { AuthButtonComponent } from '../AuthButtonComponent/AuthButtonComponent.component';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../../models/users';
import { Router } from '@angular/router';



@Component({
  selector: 'synceq-header',
  imports: [CommonModule, NgIconComponent, RouterModule, AuthButtonComponent],
  providers: [provideIcons({ bootstrapSearch, bootstrapHouse, bootstrapListUl })],
  templateUrl: './homeHeader.component.html',
  styleUrls: ['./homeHeader.component.css'],
})
export class SynceqHeader {
    title = 'synceq-header';
    auth0Info = {} as User ;

    constructor(private router : Router,
                private auth : AuthService
    ) {};

    ngOnInit(): void {
      if(this.auth.isAuthenticated$) {    
        this.auth.user$.subscribe({
          next: (res) => {
            this.auth0Info.username = res?.nickname;
          }
        });
      }
    }


    routeToProfile(): void {
      this.router.navigate(['/profile', this.auth0Info.username]);
    }
}