import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    HomeComponent,
    ProfileComponent, 
    CartComponent, 
    CheckoutComponent, 
    ProductDetailComponent, 
    ProductListComponent, 
    MenuComponent,
    CommonModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'liqour-store';

  page = '';

  changePage(selectedPage: string){
    this.page = selectedPage;
  }
}
