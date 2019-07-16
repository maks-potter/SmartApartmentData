import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SaSpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SaSpinnerComponent,
  ],
  exports: [
    SaSpinnerComponent,
  ],
})
export class SaSpinnerModule {}
