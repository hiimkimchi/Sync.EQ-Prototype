import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ENV } from './environment';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideAuth0({
      domain: ENV.auth0Domain,
      clientId: ENV.auth0ClientId,
      authorizationParams: {
        scope: 'openid profile email offline_access',
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4200'
      },
      // Enable caching of tokens in localStorage
      cacheLocation: 'localstorage',
      // Enable refresh tokens for persistent sessions
      useRefreshTokens: true
    }),
    provideHttpClient(withFetch())
  ]
};
