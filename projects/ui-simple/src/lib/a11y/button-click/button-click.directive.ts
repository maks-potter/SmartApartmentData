import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[saButtonClick]',
  host: {
    role: 'button',
  },
})
export class SaButtonClickDirective {
  @Input()
  disabled: boolean = false;

  @Input('tabindex')
  tabindex: number = 0;

  @HostBinding(`attr.tabindex`)
  get tabindexAttr (): number {
    return this.disabled ? -1 : this.tabindex;
  }

  @Output('saButtonClick') hostClick: EventEmitter<Event> = new EventEmitter<Event>();

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  @HostListener('keydown.spacebar', ['$event'])
  onHostClick ($event: Event): void {
    this.hostClick.emit($event);
  }
}
