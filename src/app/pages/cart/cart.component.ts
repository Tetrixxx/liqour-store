import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CART_ITEMS, CartItem } from './cat-items';
import { CheckoutComponent } from "../checkout/checkout.component"; // Győződj meg, hogy az elérési út helyes!
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CheckoutComponent,
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
  showCheckout: boolean = false; // Ezzel vezéreljük, hogy megjelenjen-e a child Checkout

  constructor() {}

  decrementQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  incrementQty(item: any) {
    item.quantity++;
  }

  applyPromoCode() {
    // Itt jöhet a promóciós kód logika
    console.log('Promo code applied:', this.promoCode);
  }

  secureCheckout() {
    // Korábbi secureCheckout logika, ha szükséges
    console.log('Proceeding to secure checkout');
  }

  proceedToCheckout() {
    // Ez váltja be a Checkout komponens megjelenítését
    this.showCheckout = true;
  }

  totalItems() {
    return this.cartItems.reduce((acc: any, item: { quantity: any; }) => acc + item.quantity, 0);
  }

  // Segédfüggvény a kosár végösszegének kiszámolásához
  getSubtotal() {
    return this.cartItems.reduce((sum: number, item: { beverage: { price: number; }; quantity: number; }) => sum + item.beverage.price * item.quantity, 0);
  }

  // A trackBy függvény az ngFor optimalizálásához
  trackByBeverageId(index: number, item: any): number {
    return item.beverage.id;
  }
}
