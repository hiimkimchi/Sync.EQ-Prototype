import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  templateUrl: './AuthButtonComponent.component.html',
  standalone: true,
  imports: [NgIf, AsyncPipe]
})
export class AuthButtonComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService) {}

  loginToCreate() {
    this.auth.loginWithRedirect({
      appState: {target: "/create"},
    })
  }
}