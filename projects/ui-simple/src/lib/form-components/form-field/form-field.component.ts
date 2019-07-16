import {
  AfterContentInit,
  Component,
  ContentChild,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { SaInputComponent } from '@ui-simple/form-components/input/input.component';
import { SaShowOnDirtyErrorStateMatcher } from '@ui-simple/form-components/services/error-state-matcher';

@Component({
  selector: 'sa-form-field',
  templateUrl: 'form-field.component.html',
  styleUrls: ['form-field.component.less'],
  preserveWhitespaces: false,
  host: {
    class: 'g-flex g-flex--align-center',
    tabindex: '-1',
  },
})
export class SaFormFieldComponent implements AfterContentInit, OnDestroy {
  @HostBinding('class.sa-input--disabled')
  get isDisabled (): boolean {
    return this.inputControl.disabled || this.inputElement.getAttribute('disabled') !== null;
  }

  @HostBinding('class.sa-input--readonly')
  get isReadonly (): boolean {
    return this.inputElement.getAttribute('readonly') !== null;
  }

  @HostBinding('class.sa-input--has-error')
  get hasError (): boolean {
    return this._saShowOnDirtyErrorStateMatcher.isErrorState(this.inputControl);
  }

  @HostBinding('class.sa-input--actions')
  get isFileType (): boolean {
    return this.inputElement.getAttribute('type') !== null
      && this.inputElement.getAttribute('type') === 'file';
  }

  get inputControl (): FormControl {
    return this.inputComponent.inputControl;
  }

  get inputElement (): HTMLInputElement {
    return this.inputComponent.inputElement;
  }

  @HostBinding('class.sa-focused')
  isFocused: boolean = false;

  @ContentChild(SaInputComponent) inputComponent: SaInputComponent;

  @Input('saIcon') icon: string;
  @Input('saIconRight') iconRight: string;
  @Input('saLoading') isLoading: boolean = false;
  @Input('saCanClear') canClear: boolean = true;

  private listeners: Array<() => void>;

  constructor (
    private renderer: Renderer2,
    private _saShowOnDirtyErrorStateMatcher: SaShowOnDirtyErrorStateMatcher,
  ) {
    this.onInputBlur  = this.onInputBlur.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
  }

  ngAfterContentInit (): void {
    this.listeners = [
      this.renderer.listen(this.inputElement, 'focus', this.onInputFocus),
      this.renderer.listen(this.inputElement, 'blur', this.onInputBlur),
    ];
  }

  ngOnDestroy (): void {
    if (this.listeners) {
      this.listeners.forEach((listener) => listener());
    }
  }

  @HostListener('focus')
  onHostFocus (): void {
    this.inputComponent.inputElement.focus();
  }

  onClear (event: MouseEvent): void {
    event.stopPropagation();

    this.inputControl.setValue(null);
    this.inputControl.markAsDirty();
  }

  private onInputFocus (): void {
    this.isFocused = true;
  }

  private onInputBlur (): void {
    this.isFocused = false;
  }
}
