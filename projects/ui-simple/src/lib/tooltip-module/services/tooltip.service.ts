import { ComponentType, Overlay, ScrollDispatcher, ScrollStrategy } from '@angular/cdk/overlay';
import { ElementRef, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { SA_TOOLTIP_CONFIG, SA_TOOLTIP_SCROLL_STRATEGY } from '@ui-simple/tooltip-module/constants/tooltip.constant';
import { SaTooltipConfig } from '@ui-simple/tooltip-module/models/tooltip-config';
import { SaTooltipDef } from '@ui-simple/tooltip-module/models/tooltip-def';

@Injectable()
export class SaTooltipService {
  private _tooltips: Map<string, SaTooltipDef<any>> = new Map();

  constructor (
    private _overlay: Overlay,
    private _scrollDispatcher: ScrollDispatcher,
    private _ngZone: NgZone,
    private _injector: Injector,
    @Inject(SA_TOOLTIP_CONFIG) private _defaulConfig: Partial<SaTooltipConfig>,
    @Inject(SA_TOOLTIP_SCROLL_STRATEGY) private _scrollStrategy: () => ScrollStrategy,
  ) {
  }

  create<T = any, D = any> (
    componentType: ComponentType<T>,
    element: ElementRef,
    config: Partial<SaTooltipConfig<D>>,
  ): SaTooltipDef<T> {
    config = { ...this._defaulConfig, ...config };

    if (!config.scrollStrategy) {
      config.scrollStrategy = this._scrollStrategy;
    }

    const tooltipDef = new SaTooltipDef<T>(
      componentType,
      element,
      config,
      this._overlay,
      this._scrollDispatcher,
      this._injector,
      this._ngZone,
    );

    this._tooltips.set(tooltipDef.id, tooltipDef);

    return tooltipDef;
  }
}
