import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

const SA_DISABLED_CLASS = 'sa-disabled';
const SA_TEXT_NODE      = 3;

@Component({
  selector: '[sa-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'button',
    class: 'g-flex--align-center',
  },
})
export class SaButtonComponent implements AfterViewInit {
  @Input('saDisabled')
  @HostBinding(`class.${SA_DISABLED_CLASS}`)
  isDisabled: boolean = false;

  @HostBinding('attr.disabled')
  get disabledAttr (): boolean {
    return this.isDisabled || this.isLoading || null;
  }

  @Input('tabindex')
  tabindex: number = 0;

  @HostBinding(`attr.tabindex`)
  get tabindexAttr (): number {
    return this.isDisabled ? -1 : this.tabindex;
  }

  @Input('saIcon') icon: string;
  @Input('saIconRight') iconRight: string;

  @Input('saLoading') isLoading: boolean = false;

  @ViewChild('content', { read: ElementRef }) contentElement: ElementRef;

  isContentEmpty: boolean;

  constructor (
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _changeDetector: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit (): void {
    this.isContentEmpty = this.getIsContentEmpty();

    this._changeDetector.markForCheck();

    if (this.icon && this.isContentEmpty) {
      this._renderer.addClass(this._elementRef.nativeElement, 'sa-icon-btn');
    }
  }

  getIsContentEmpty (): boolean {
    const childNodes = (this.contentElement.nativeElement as HTMLElement).childNodes;

    return !childNodes.length ||
      (childNodes.length === 1 && childNodes[0].nodeType === SA_TEXT_NODE && childNodes[0].textContent.trim() === '');
  }

  @HostListener('mousedown', ['$event'])
  onClick ($event: Event): void {
    if (this.isDisabled || this.isLoading) {
      $event.stopPropagation();
      $event.preventDefault();
    }
  }
}
