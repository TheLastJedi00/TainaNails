import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { environment } from './environments/environment.development';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  
if (environment.production && environment.apiUrl.includes('localhost')) {
  throw new Error('API URL não pode ser localhost em produção!');
}