import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { AuthService } from '@auth0/auth0-angular';

// found fix here: https://community.auth0.com/t/auth0-in-angular/126927/2
const provideMockSSRConfig: ApplicationConfig = {
  providers: [{
    provide: AuthService,
    useValue: {},
  },],
};

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
  ]
};

export const config = mergeApplicationConfig(appConfig, 
                                            serverConfig, 
                                            provideMockSSRConfig
                                          );
