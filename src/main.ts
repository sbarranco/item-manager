import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  const { worker } = require('./mocks/browser');
  worker.start();
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
