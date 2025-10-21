import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/app.config';
import { AppComponent } from './app/app.component';
import { setEnv } from './app/core/environment';

fetch('/assets/config.json')
  .then((res) => res.json())
  .then((config) => {
    setEnv(config);
    return bootstrapApplication(AppComponent, appConfig);
  })
  .catch((err) => console.error('Failed to load config.json', err));
