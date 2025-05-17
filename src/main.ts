import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
     provideFirebaseApp(() => 
      initializeApp({ 
        projectId: "liqour-store-69b89",
        appId: "1:860259198324:web:e8e5b06faa7c3e7c3e7821", 
        storageBucket: "liqour-store-69b89.firebasestorage.app", 
        apiKey: "AIzaSyCd0qTHcmjOlCqi3W8ScYiGU7OmZn5OJSY", 
        authDomain: "liqour-store-69b89.firebaseapp.com", 
        messagingSenderId: "860259198324" })), 
        provideAuth(() => 
        getAuth()), 
        provideFirestore(() => getFirestore())
  ]
}).catch(err => console.error(err));