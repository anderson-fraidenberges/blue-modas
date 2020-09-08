import { Routes } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CartComponent } from './navigation/cart/cart.component';
import { OrderResultComponent } from './order-result/order-result.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full'},    
    { path: 'products', component: ProductListComponent },     
    { path: 'cart', component: CartComponent },    
    { path: 'order/:id', component: OrderResultComponent }    
];