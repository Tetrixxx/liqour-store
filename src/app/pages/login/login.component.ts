import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule
  ]
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.loginForm.value;
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/profile']);
    } catch (error: any) {
      this.errorMessage = this.getFirebaseError(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  private getFirebaseError(code: string): string {
    switch (code) {
      case 'auth/user-not-found':
        return 'Nincs ilyen felhasználó';
      case 'auth/wrong-password':
        return 'Hibás jelszó';
      case 'auth/too-many-requests':
        return 'Túl sok próbálkozás, próbáld újra később';
      default:
        return 'Hiba történt a bejelentkezés során';
    }
  }
}