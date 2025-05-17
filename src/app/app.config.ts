import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
    initializeApp({
      apiKey: "AIzaSyCd0qTHcmjOlCqi3W8ScYiGU7OmZn5OJSY",
      authDomain: "liqour-store-69b89.firebaseapp.com",
      projectId: "liqour-store-69b89",
      storageBucket: "liqour-store-69b89.firebasestorage.app",
      messagingSenderId: "860259198324",
      appId: "1:860259198324:web:e8e5b06faa7c3e7c3e7821"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ],

};
