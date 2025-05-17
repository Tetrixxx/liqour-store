import { Component, Input, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper'; // Added MatStepperModule
import { Output, EventEmitter } from '@angular/core';
import { PriceWithTaxPipe } from "../../shared/Pipe";
import { MatNativeDateModule } from '@angular/material/core'; // Add this line

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatStepperModule,
    PriceWithTaxPipe,
    MatDatepickerModule,
    MatNativeDateModule,
],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  @Output() returnToCart = new EventEmitter<void>();
  @Output() checkoutComplete = new EventEmitter<void>();
  @Input() cartItems: any[] = [];
  checkoutForm!: FormGroup;
  activeStep = 0;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      instructions: ['']
    });
  }
  goBackToCart() {
    this.returnToCart.emit();
  }

  incrementQty(item: any) {
    item.quantity++;
  }

  decrementQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotalItems() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  trackByBeverageId(index: number, item: any): number {
    return item.beverage.id;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form submitted:', this.checkoutForm.value);
      this.activeStep++;
      this.checkoutComplete.emit(); // Emit the output event
    }
  }

  getSubtotal() {
  return this.cartItems.reduce((sum: number, item: { beverage: { price: number; }; quantity: number; }) => sum + item.beverage.price * item.quantity, 0);
  }

}
