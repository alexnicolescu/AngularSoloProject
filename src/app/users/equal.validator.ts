import {Directive, forwardRef, OnDestroy} from '@angular/core';
import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import {Input} from '@angular/core';

@Directive(
  {
    selector: '[validateEqualTo][ngModel],[validateEqualTo][formControlName]',
    providers: [
      {
        provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualTextValidator), multi: true
      }
    ]
  }
)
export default class EqualTextValidator implements Validator {
  @Input()
  validateEqualTo: string;

  validate(c: AbstractControl) {
    const passwordVal = c.value;
    const repeatEle = c.root.get(this.validateEqualTo);
    return this.checkEquality(passwordVal, repeatEle);
  }

  checkEquality(passwordVal: string, repeatEle: any) {
    if (repeatEle && passwordVal !== repeatEle.value) {
      return {
        validateEqual: true
      };
    }
    return null;
  }
}
