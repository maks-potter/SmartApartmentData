import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { InjectionToken } from '@angular/core';
import { SA_PLACEMENTS } from '@ui-simple/tooltip-module/constants/positions.constant';
import { SA_TOOLTIP_TRIGGERS } from '@ui-simple/tooltip-module/constants/triggers.constant';
import { SaTooltipConfig } from '@ui-simple/tooltip-module/models/tooltip-config';

export const SA_TOOLTIP_SELECTOR_CLASS = 'js-tooltip';

export const SA_TOOLTIP_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('SA_TOOLTIP_SCROLL_STRATEGY');

export const SA_TOOLTIP_CONFIG = new InjectionToken<SaTooltipConfig>('SA_TOOLTIP_CONFIG');

export const SA_TOOLTIP_DATA = new InjectionToken<any>('SA_TOOLTIP_DATA');

export const SA_SCROLL_THROTTLE_MS = 20;

export const SA_TOOLTIP_DEFAULT_CONFIG: Partial<SaTooltipConfig> = {
  mouseEnterDelay: 1,
  mouseLeaveDelay: 0.1,
  trigger: SA_TOOLTIP_TRIGGERS.HOVER,
  class: '',
  styles: {},
  placement: SA_PLACEMENTS.TOP,
  backdropClass: 'cdk-overlay-transparent-backdrop',
};

export function SA_TOOLTIP_SCROLL_STRATEGY_FACTORY (overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition({scrollThrottle: SA_SCROLL_THROTTLE_MS});
}

export const SA_TOOLTIP_VIEW_PORT_MARGIN = 6;
