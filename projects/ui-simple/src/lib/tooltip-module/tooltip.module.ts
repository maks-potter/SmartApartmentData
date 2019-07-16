import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SaTooltipContainerComponent,
} from '@ui-simple/tooltip-module/components/tooltip-container/tooltip-container.component';
import {
  SA_TOOLTIP_CONFIG,
  SA_TOOLTIP_DEFAULT_CONFIG,
  SA_TOOLTIP_SCROLL_STRATEGY, SA_TOOLTIP_SCROLL_STRATEGY_FACTORY,
} from '@ui-simple/tooltip-module/constants/tooltip.constant';
import { SaTooltipService } from '@ui-simple/tooltip-module/services/tooltip.service';

import { SaTooltipComponent } from './components/tooltip/tooltip.component';
import { SaTooltipDirective } from './components/tooltip/tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [
    SaTooltipService,
    {
      provide: SA_TOOLTIP_CONFIG,
      useValue: SA_TOOLTIP_DEFAULT_CONFIG,
    },
    {
      provide: SA_TOOLTIP_SCROLL_STRATEGY,
      deps: [Overlay],
      useFactory: SA_TOOLTIP_SCROLL_STRATEGY_FACTORY,
    },
  ],
  declarations: [
    SaTooltipComponent,
    SaTooltipDirective,
    SaTooltipContainerComponent,
  ],
  exports: [
    SaTooltipComponent,
    SaTooltipDirective,
  ],
  entryComponents: [
    SaTooltipComponent,
    SaTooltipContainerComponent,
  ],
})
export class SaTooltipModule {}
