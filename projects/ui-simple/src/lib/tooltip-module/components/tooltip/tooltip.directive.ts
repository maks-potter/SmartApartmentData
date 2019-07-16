import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { SaTooltipComponent } from '@ui-simple/tooltip-module/components/tooltip/tooltip.component';
import { SaTooltipConfig } from '@ui-simple/tooltip-module/models/tooltip-config';
import { SaTooltipDef } from '@ui-simple/tooltip-module/models/tooltip-def';
import { SaTooltipService } from '@ui-simple/tooltip-module/services/tooltip.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';

import { SA_PLACEMENTS } from '../../constants/positions.constant';
import { SA_TOOLTIP_TRIGGERS } from '../../constants/triggers.constant';

@Directive({
  selector: '[saTooltip]',
  exportAs: 'tooltip',
})
export class SaTooltipDirective implements OnChanges, AfterViewInit, OnDestroy {
  @Input('saTooltip')
  set content (value: string | TemplateRef<any>) {
    this._content    = value;
    this._isDisabled = !value;
  }

  @Input('saOverlayClassName') className: string             = '';
  @Input('saOverlayStyle') styles: { [key: string]: string } = {};

  @Input('saMouseEnterDelay') mouseEnterDelay: number = 1; // Unit: second
  @Input('saMouseLeaveDelay') mouseLeaveDelay: number = 0.1; // Unit: second

  @Input('saTrigger') trigger: SA_TOOLTIP_TRIGGERS = SA_TOOLTIP_TRIGGERS.HOVER;
  @Input('saPlacement') placement: SA_PLACEMENTS   = SA_PLACEMENTS.TOP;

  // Can tooltip be hovered when trigger is 'hover'
  @Input('saTooltipInteractive') isInteractive: boolean = false;

  @Input('saShowArrow') isShowArrow: boolean = true;

  @Output('saVisibleChange') onVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  isVisible: boolean;

  @HostBinding('class.sa-disabled')
  @Input('saDisabled')
  set isDisabled (value: boolean) {
    this._isDisabled = this._content ? value : true;
  }

  get isDisabled (): boolean {
    return this._isDisabled;
  }

  protected _tooltipDef: SaTooltipDef<SaTooltipComponent>;
  protected readonly _destroy$: Subject<void> = new Subject();
  protected _content: string | TemplateRef<void>;
  protected _isDisabled: boolean              = false;

  constructor (
    protected _elementRef: ElementRef,
    protected _saTooltipService: SaTooltipService,
    protected _viewContainerRef: ViewContainerRef,
  ) {
  }

  ngOnChanges (): void {
    if (this._tooltipDef) {
      this._tooltipDef.update(this.getConfig());
    }
  }

  ngAfterViewInit (): void {
    this.createTooltipDef();

    this._tooltipDef.onChangeVisibility
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._destroy$),
      )
      .subscribe((isVisible) => {
        this.isVisible = isVisible;

        this.onVisibleChange.emit(isVisible);
      });
  }

  ngOnDestroy (): void {
    if (this._tooltipDef) {
      this._tooltipDef.destroy();
    }

    this._destroy$.next();
    this._destroy$.complete();
  }

  show (): void {
    if (this._tooltipDef) {
      this._tooltipDef.show();
    }
  }

  update (): void {
    if (this._tooltipDef) {
      this._tooltipDef.update(this.getConfig());
    }
  }

  hide (): void {
    if (this._tooltipDef) {
      this._tooltipDef.hide();
    }
  }

  protected createTooltipDef (): void {
    this._tooltipDef = this._saTooltipService.create(SaTooltipComponent, this._elementRef, this.getConfig());
  }

  protected getConfig (): Partial<SaTooltipConfig> {
    return {
      trigger: this.trigger,
      placement: this.placement,
      data: {
        content: this._content,
        class: this.className,
        styles: this.styles,
      },
      isInteractive: this.isInteractive,
      isShowArrow: this.isShowArrow,
      mouseEnterDelay: this.mouseEnterDelay,
      mouseLeaveDelay: this.mouseLeaveDelay,
      isDisabled: this._isDisabled,
      viewContainerRef: this._viewContainerRef,
    };
  }
}
