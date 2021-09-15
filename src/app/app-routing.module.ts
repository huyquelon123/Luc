import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopMainComponent } from './shop-main/shop-main.component';
import { ShopLoginComponent } from './shop-login/shop-login.component';
import { CartComponent } from './cart/cart.component';
import { CheckOutComponent } from './check-out/check-out.component';

const routes: Routes = [
  {path: '', redirectTo: '/shop', pathMatch: 'full'},
  {path: 'shop', component: ShopMainComponent},
  {path: 'login', component: ShopLoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
