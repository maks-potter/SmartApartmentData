import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SaButtonModule } from '@ui-simple/buttons/button.module';
import {
  SaLayoutWithLeftPanelComponent,
} from '@ui-simple/layout/components/layout-left-panel/layout-left-panel.component';
import { SaTooltipModule } from '@ui-simple/tooltip-module/tooltip.module';

@NgModule({
  imports: [
    CommonModule,
    SaTooltipModule,
    SaButtonModule,
  ],
  declarations: [
    SaLayoutWithLeftPanelComponent,
  ],
  exports: [
    SaLayoutWithLeftPanelComponent,
  ],
})
export class SaLayoutModule {}
