import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const appConfigWithHttpClient = {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideHttpClient(), provideAnimationsAsync()
  ]
};

bootstrapApplication(AppComponent, appConfigWithHttpClient)
  .catch((err) => console.error(err));