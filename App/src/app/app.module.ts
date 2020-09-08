import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { rootRouterConfig } from './app.routes';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './navigation/footer/footer.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CartComponent } from './navigation/cart/cart.component';
import { ControlAccessAplicationService } from './services/controlAccesssAplication.service';
import { BadgeObserver } from './observers/badge.observer';
import { ProductCartObserver } from './observers/productCart.observer';
import { OrderService } from './services/order.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from './common/directives/masks.directive';
import { OrderResultComponent } from './order-result/order-result.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    FooterComponent,
    MenuComponent,
    CartComponent,
    PhoneMaskDirective,
    OrderResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forRoot(rootRouterConfig, { useHash: false })]
  ],
  providers: [ProductService, ControlAccessAplicationService, OrderService, BadgeObserver, ProductCartObserver, ProductListComponent, {
     provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})

export class AppModule {}
