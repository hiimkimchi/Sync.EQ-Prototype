import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { setEnv } from './app/core/environment';
import { createAppConfig } from './app/core/app.config';

fetch('/assets/config.json')
  .then((res) => res.json())
  .then((config) => {
    setEnv(config);
    return bootstrapApplication(AppComponent, createAppConfig());
  })
  .catch((err) => console.error('Failed to load config.json', err));
