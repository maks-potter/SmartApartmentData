import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SaCardComponent } from '@ui-common/card/card.component';
import { SaUIModule } from '@ui-simple/ui.module';

@NgModule({
  imports: [
    CommonModule,
    SaUIModule,
  ],
  declarations: [
    SaCardComponent,
  ],
  exports: [
    SaCardComponent,
  ],
})
export class SaCardModule {}
