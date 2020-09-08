import { Component, OnInit } from '@angular/core';
import { BadgeObserver } from 'src/app/observers/badge.observer';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit  {
  
  public badgeValue : string ="";

  constructor(private badge : BadgeObserver) {    
    this.badge.currentBadgeValue.subscribe(d=> { this.badgeValue = d });
  } 
  ngOnInit(): void {
    this.badge.changeBadgeValue(localStorage.getItem('totalCart'));
  }

}