import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class CartComponent implements OnInit {
  // Három input: a kosár fejléc szövegét, a promóciós kód szerepét és a pénznem kódját lehet így paraméterezni
  @Input() cartTitle: string = 'Your Cart';
  @Input() allowPromo: boolean = true;
  @Input() currencyCode: string = 'USD';

  // Három output: a kosár változását, a promó kód érvényesítését és a checkout indítását jelezhetjük így
  @Output() cartUpdated: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() promoCodeApplied: EventEmitter<string> = new EventEmitter<string>();
  @Output() checkoutClicked: EventEmitter<void> = new EventEmitter<void>();

  cartItems = CART_ITEMS;
  promoCode: string | null = null;
  fontSize: number = 14;

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {
    // A router state olvasása, ha van kosáradat
    const state = history.state;
    if (state && state.cartItems) {
      this.cartItems = state.cartItems;
    }
  }

  decrementQty(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartUpdated.emit(this.cartItems);
    }
  }

  incrementQty(item: any) {
    item.quantity++;
    this.cartUpdated.emit(this.cartItems);
  }

  applyPromoCode() {
    console.log('Promo code applied:', this.promoCode);
    if (this.promoCode) {
      this.promoCodeApplied.emit(this.promoCode);
    }
  }

  async proceedToCheckout() {
    const user = this.auth.currentUser;
    this.checkoutClicked.emit();
    if (user) {
      // A router state-ben átadjuk a kosárt
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
