import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from 'src/models/order';

@Component({
  selector: 'app-order-result',
  templateUrl: './order-result.component.html',
  styleUrls: ['./order-result.component.css']
})

export class OrderResultComponent implements OnInit {
  public order: Order;
  constructor(private route: ActivatedRoute, private orderService:OrderService) {}
 
  ngOnInit() {
    const orderId = this.route.snapshot.params["id"];
    this.orderService.get(orderId).subscribe(res=> {  this.order = res } );      
  }
}
