import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const auth = inject(Auth);
  const router = inject(Router);
  
  return new Observable<boolean>(subscriber => {
    const unsubscribe = auth.onAuthStateChanged(
      user => {
        if (user) {
          subscriber.next(true);
        } else {
          router.navigate(['/login']);
          subscriber.next(false);
        }
        subscriber.complete();
      },
      error => {
        console.error('Auth error:', error);
        router.navigate(['/login']);
        subscriber.next(false);
        subscriber.complete();
      }
    );

    return () => unsubscribe();
  });
};