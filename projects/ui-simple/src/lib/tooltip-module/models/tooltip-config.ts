import { ScrollStrategy } from '@angular/cdk/overlay';
import { ViewContainerRef } from '@angular/core';
import { SA_DEFAULT_POSITIONS, SA_PLACEMENTS } from '@ui-simple/tooltip-module/constants/positions.constant';
import { SA_TOOLTIP_TRIGGERS } from '@ui-simple/tooltip-module/constants/triggers.constant';

export class SaTooltipConfig<T = any> {
  class: string;
  styles: { [key: string]: string };
  isDisabled: boolean;
  trigger: SA_TOOLTIP_TRIGGERS;
  placement: SA_PLACEMENTS;
  isInteractive: boolean;
  mouseEnterDelay: number;
  mouseLeaveDelay: number;
  hasBackdrop: boolean;
  backdropClass: string;
  viewContainerRef: ViewContainerRef;
  data: T;
  positions: typeof SA_DEFAULT_POSITIONS;
  scrollStrategy: () => ScrollStrategy;
  isShowArrow: boolean;
}
