import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BadgeObserver {

  private badgeSource = new BehaviorSubject('');
  currentBadgeValue = this.badgeSource.asObservable();  

  changeBadgeValue(badgeValue: string) {
    this.badgeSource.next(badgeValue);
  }
}