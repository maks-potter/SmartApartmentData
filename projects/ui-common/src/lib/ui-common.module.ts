import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SaCardModule } from '@ui-common/card/card.module';
import { SaUIModule } from '@ui-simple/ui.module';

@NgModule({
  imports: [
    CommonModule,
    SaUIModule,
    SaCardModule,
  ],
  exports: [
    SaCardModule,
  ],
})
export class SaUICommonModule {}
