import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { passwordsMatchValidator } from '../../shared/passwords-match.validator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  async onSubmit() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const { email, password } = this.signupForm.value;
      await createUserWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.errorMessage = this.translateFirebaseError(error.code);
    } finally {
      this.isLoading = false;
    }
  }

  private translateFirebaseError(code: string): string {
    const errors: { [key: string]: string } = {
      'auth/email-already-in-use': 'Ez az email már regisztrálva van',
      'auth/weak-password': 'A jelszó túl gyenge',
      'auth/invalid-email': 'Érvénytelen email cím'
    };
    return errors[code] || 'Ismeretlen hiba történt';
  }
}