import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { firebaseEnv } from './../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore'; // <-- Importação do emulador corrigida

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(
      AngularFireModule.initializeApp(firebaseEnv.firebase)
    ),
    importProvidersFrom(
      AngularFireAuthModule
    ),
    importProvidersFrom(
      AngularFirestoreModule
    ),
    isDevMode() ? [
      { provide: USE_AUTH_EMULATOR, useValue: ['http://localhost:9099'] },
      { provide: USE_FIRESTORE_EMULATOR, useValue: ['localhost', 8080] }
    ] : [],
  ]
};
