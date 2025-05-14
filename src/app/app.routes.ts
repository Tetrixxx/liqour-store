import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfileComponent } from './pages/profile/profile.component';

// (Opció: AuthGuard import, ha később védeni akarod a profile vagy checkout oldalt)
// import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },

  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent /*, canActivate: [AuthGuard] */ },

  { path: 'profile', component: ProfileComponent /*, canActivate: [AuthGuard] */ },

  // Catch-all a nem létező utakhoz
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }