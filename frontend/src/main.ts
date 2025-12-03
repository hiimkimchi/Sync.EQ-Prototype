import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/core/app.config';

bootstrapApplication(AppComponent, appConfig);

// fetch('/assets/config.json')
//   .then((res) => res.json())
//   .then((config) => {
//     return bootstrapApplication(AppComponent, appConfig);
//   })
//   .catch((err) => console.error('Failed to load config.json', err));
