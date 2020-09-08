import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][phoneMask]',
})

export class PhoneMaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }


  onInputChange(event, backspace) {
    if (event) {
      let r = event.replace(/\D/g, '');

      if (backspace && r.length <= 6) {
        r = r.substring(0, r.length - 1);
      }

      r = r.replace(/^0/, "");
      if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
      } else {
        r = r.replace(/^(\d*)/, "($1");
      }

      this.ngControl.valueAccessor.writeValue(r);
    }
  }
}

