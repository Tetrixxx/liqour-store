import { Component } from '@angular/core';
import { CART_ITEMS } from './cat-items';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems = CART_ITEMS;
  promoCode: string | null = null;
  fontSize: number = 14;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

    ngOnInit(): void {
    // Read the state when component initializes
    const state = history.state;
    if (state && state.cartItems) {
      this.cartItems = state.cartItems;
    }
  }
  
  decrementQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  incrementQty(item: any) {
    item.quantity++;
  }

  applyPromoCode() {
    // Itt implementáld a promóciós kód logikáját
    console.log('Promo code applied:', this.promoCode);
  }

  async proceedToCheckout() {
    const user = this.auth.currentUser;
    if (user) {
      // A router state-ben átadjuk a cartItems tömböt
      this.router.navigate(['/checkout'], { state: { cartItems: this.cartItems } });
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/checkout' } });
    }
  }

  totalItems() {
    return this.cartItems.reduce((acc: number, item: { quantity: number; }) => acc + item.quantity, 0);
  }

  getSubtotal() {
    return this.cartItems.reduce((sum: number, item: { beverage: { price: number; }; quantity: number; }) =>
      sum + item.beverage.price * item.quantity, 0);
  }

  trackByBeverageId(index: number, item: any): number {
    return item.beverage.id;
  }
}
