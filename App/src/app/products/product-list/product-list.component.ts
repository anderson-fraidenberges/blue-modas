import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ControlAccessAplicationService } from 'src/app/services/controlAccesssAplication.service';
import { Product } from 'src/models/product';
import { GlobalVariables } from 'src/app/common/global-variables';
import { BadgeObserver } from "src/app/observers/badge.observer";
import { ProductCartObserver } from "src/app/observers/productCart.observer";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductService, private controlAccessService: ControlAccessAplicationService, private badgeObserver: BadgeObserver, private productCartObserver: ProductCartObserver) {
    this.load();
  }

  private totalCart: number;

  public products: Product[];

  private productsCart: Product[];

  addCart(product: Product) {

    var productInCart = this.productsCart.filter(function (prod) {
      return prod.id == product.id;
    });

    if (productInCart.length) {
      var index = this.productsCart.indexOf(productInCart[0]);
      this.productsCart[index].quantity++;
    } else {
      product.quantity = 1;
      this.productsCart.push(product);
    }

    this.save();
  }

  load() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.productsCart = JSON.parse(data);
    } else {
      this.productsCart = [];
    }

    this.productCartObserver.changeProductCartValue(this.productsCart);
  }

  save() {
    localStorage.setItem('cart', JSON.stringify(this.productsCart));

    var totalCart = this.productsCart.reduce(function (_this, val) {
      return _this + val.quantity
    }, 0);

    localStorage.setItem('totalCart', JSON.stringify(totalCart));

    this.badgeObserver.changeBadgeValue(totalCart.toString());
    this.productCartObserver.changeProductCartValue(this.productsCart);
  }

  ngOnInit() {

    //valida acesso da aplicação a API, caso positivo retorna token jwt 
    //com autorização de acesso ao demais metodos da api 
    this.controlAccessService.getTokenJwt().subscribe(resp => {
      GlobalVariables.tokenJwt = resp["token"];
      this.productService.listProduct().subscribe(products => {
        this.products = products;
      });
      this.load();
    });


  }
}