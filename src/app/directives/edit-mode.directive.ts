import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appEditMode]'
})
export class EditModeDirective {

  @Input('disableControl') set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }
  constructor(private ngControl: NgControl) { }
}
