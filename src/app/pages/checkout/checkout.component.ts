import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { PriceWithTaxPipe } from '../../shared/Pipe';
import { DiscountPricePipe } from "../../shared/Pipe2";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatStepperModule,
    MatNativeDateModule,
    PriceWithTaxPipe,
    DiscountPricePipe
],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  // Input-ok
  @Input() checkoutTitle: string = 'Checkout';
  @Input() showStepper: boolean = true;
  @Input() currencySymbol: string = '$';

  // Output-ok
  @Output() orderSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() formValidityChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() backToCartEvent: EventEmitter<any[]> = new EventEmitter<any[]>();

  cartItems: any[] = [];
  checkoutForm!: FormGroup;
  activeStep = 0;
  currentYear = new Date().getFullYear();

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // A router state-ből olvassuk ki a kosár termékeket.
    this.cartItems = history.state.cartItems || [];

    this.checkoutForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      instructions: ['']
    });



    // Az űrlap validitásának változását jelezzük
    this.checkoutForm.statusChanges.subscribe(status => {
      this.formValidityChanged.emit(status === 'VALID');
    });
  }

  goBackToCart(): void {
    this.backToCartEvent.emit(this.cartItems);
    this.router.navigate(['/cart'], { state: { cartItems: this.cartItems } });
  }

  incrementQty(item: any): void {
    item.quantity++;
  }

  decrementQty(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  trackByBeverageId(index: number, item: any): number {
    return item.beverage.id;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      console.log('Form submitted:', this.checkoutForm.value);
      this.orderSubmitted.emit(this.checkoutForm.value);
      this.activeStep++;
      // További fizetési logika itt megvalósítható.
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce(
      (sum: number, item: { beverage: { price: number }; quantity: number }) =>
        sum + item.beverage.price * item.quantity,
      0
    );
  }
}

