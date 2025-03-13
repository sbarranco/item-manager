import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
} else {
  import('./mocks/browser').then(({ worker }) => {
    worker.start({
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  });
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
