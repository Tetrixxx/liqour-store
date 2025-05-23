import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordsMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) return null;

  return password.value === confirmPassword.value 
    ? null 
    : { mismatch: true };
};