import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SaIconModule } from '../icon/icon.module';
import { SaSpinnerModule } from '../spinner/spinner.module';

import { SaButtonComponent } from './button/button.component';

@NgModule({
  imports: [
    CommonModule,
    SaSpinnerModule,
    SaIconModule,
  ],
  declarations: [
    SaButtonComponent,
  ],
  exports: [
    SaButtonComponent,
  ],
})
export class SaButtonModule {
}
