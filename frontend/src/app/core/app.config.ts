import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ENV, setEnv } from './environment';

import { provideHttpClient, withFetch } from '@angular/common/http';

export function createAppConfig() {
  return {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes), 
      provideClientHydration(withEventReplay()),
      provideAuth0({
        domain: ENV.auth0Domain,
        clientId: ENV.auth0ClientId,
        authorizationParams: {
          redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:4200'
        },
        // Enable caching of tokens in localStorage
        cacheLocation: 'localstorage',
        // Enable refresh tokens for persistent sessions
        useRefreshTokens: true
      }),
      provideHttpClient(withFetch())
    ]
  }
};
