import { Component, OnInit } from '@angular/core';
import { ProductCartObserver } from 'src/app/observers/productCart.observer';
import { Product } from 'src/models/product';
import { BadgeObserver } from 'src/app/observers/badge.observer';
import { ProductListComponent } from 'src/app/products/product-list/product-list.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class CartComponent implements OnInit {
  public productCartList: Product[];
  public totalValue = 0;
  public form: FormGroup;
  public mode = 'list';

  constructor(private fb: FormBuilder, private router: Router, private orderService: OrderService,
    private productCartObserver: ProductCartObserver, private badgeObserver: BadgeObserver,
    private productListComponent: ProductListComponent) 
    {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone: ['', Validators.compose([Validators.required,
                  Validators.minLength(14)])]
    });
  }

  onChangeMode(mode: string) {
    this.mode = mode;
    if (mode == 'list') {
      this.form.reset();
    }
  }

  onChange(product: Product) {

    if (product.quantity == 0 || !product.quantity) {
      const index = this.productCartList.indexOf(product);
      if (index !== -1) {
        this.productCartList.splice(index, 1);
      }
    }

    localStorage.setItem('cart', JSON.stringify(this.productCartList));
    this.updateBadgeValue();
    this.updateTotalValue();
  }

  onSubmit() {

    var data = {
      "name": this.form.controls.name.value,
      "email": this.form.controls.email.value,
      "phone": this.form.controls.phone.value,
      "products": this.productCartList
    }

    this.orderService.send(JSON.stringify(data)).subscribe(response => {
      if (response["orderId"]) {
         this.clearCache();
      }
        this.router.navigate(['/order', response["orderId"]]);
      }
    );
  }

  private updateTotalValue() {
    this.totalValue = this.productCartList.reduce(function (_this, val) {
      return _this + (val.price * val.quantity)
    }, 0);

    localStorage.setItem('cartTotalValue', JSON.stringify(this.totalValue));
  }

  private clearCache() {
    localStorage.clear();
    this.badgeObserver.changeBadgeValue("");
    this.productCartObserver.changeProductCartValue([]);
    this.productCartList = [];
    this.totalValue = 0;
    this.form.reset();
  }

  private updateBadgeValue() {

    var totalCart = this.productCartList.reduce(function (_this, val) {
      return _this + val.quantity
    }, 0);

    localStorage.setItem('totalCart', JSON.stringify(totalCart));

    this.badgeObserver.changeBadgeValue(totalCart.toString());
    this.productCartObserver.changeProductCartValue(this.productCartList);
  }

  ngOnInit() {

    this.productCartObserver.currentProductCartValue.subscribe(p => {
      this.productCartList = p;
    });

    this.updateTotalValue();
  }
}
