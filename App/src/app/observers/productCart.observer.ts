import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/models/product';

@Injectable()
export class ProductCartObserver {

  private productCartSource = new BehaviorSubject<Product[]>([]);
  currentProductCartValue = this.productCartSource.asObservable();  

  changeProductCartValue(productCartValue: Product[]) {
    this.productCartSource.next(productCartValue);
  }

}