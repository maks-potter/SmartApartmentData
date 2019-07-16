import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Optional,
  Self,
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'sa-input, input[sa-input], textarea[sa-input]',
  template: '',
  styleUrls: ['input.component.less'],
  preserveWhitespaces: false,
  host: {
    class: 'g-flex__item',
  },
})
export class SaInputComponent implements OnChanges {
  public readonly inputElement: HTMLInputElement;

  @Input('saIsDisabled') private _isDisabled: boolean;

  @HostBinding('class.sa-input--actions')
  get isFileType (): boolean {
    return this.inputElement.getAttribute('type') !== null
      && this.inputElement.getAttribute('type') === 'file';
  }

  get inputControl (): FormControl {
    return this.ngControl.control as FormControl;
  }

  constructor (
    @Optional() @Self() public ngControl: NgControl,
    private _elementRef: ElementRef,
  ) {
    this.inputElement = this._elementRef.nativeElement as HTMLInputElement;
  }

  ngOnChanges (): void {
    this.setDisabledState();
  }

  private setDisabledState (): void {
    if (this._isDisabled) {
      this.inputControl.disable();
    } else {
      this.inputControl.enable();
    }
  }
}
