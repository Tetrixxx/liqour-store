import { Component } from '@angular/core';
import { CART_ITEMS, CartItem } from './cat-items';
import { CheckoutComponent } from "../checkout/checkout.component"; // Győződj meg, hogy az elérési út helyes!
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar'; 

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
  fontSize: number = 14;
  getIconSize(): string {
    return `${this.fontSize + 4}px`;
  }
    constructor(
    private auth: Auth,
    private router: Router
  ) {}
  
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

  async proceedToCheckout() {
    const user = this.auth.currentUser;
    
    if(user) {
      this.router.navigate(['/checkout']);
      this.showCheckout = true;
    } else {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: '/checkout' } 
      });
    }

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
    goBackToCart() {
    this.showCheckout = false;
  }

}
