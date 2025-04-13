import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CART_ITEMS, CartItem } from './cat-items'; // Adjust the import path as necessary
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  checkoutForm: FormGroup;
  cartItems = CART_ITEMS;

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      promoCode: ['', Validators.maxLength(10)]
    });
  }

  decrementQty(item: any) {
    if (item.quantity > 1) item.quantity--;
  }

  incrementQty(item: any) {
    item.quantity++;
  }

  applyPromoCode() {
    // Promo code logic here
    console.log('Promo code applied:', this.checkoutForm.value.promoCode);
  }

  secureCheckout() {
    // Checkout logic here
    console.log('Proceeding to secure checkout');
  }

  totalItems() {
    return this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }

  removeItem() {
    this.cartItems = this.cartItems.filter(item => item.quantity > 0);
  }
  
}