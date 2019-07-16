import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaA11yModule } from '@ui-simple/a11y/a11y.module';
import { SaButtonModule } from '@ui-simple/buttons/button.module';
import { SaFormModule } from '@ui-simple/form-components/form.module';
import { SaIconModule } from '@ui-simple/icon/icon.module';
import { SaLayoutModule } from '@ui-simple/layout/layout.module';
import { SaSpinnerModule } from '@ui-simple/spinner/spinner.module';
import { SaTooltipModule } from '@ui-simple/tooltip-module/tooltip.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SaA11yModule,
    SaTooltipModule,
    SaIconModule,
    SaLayoutModule,
    ScrollingModule,
    SaButtonModule,
    SaSpinnerModule,
    SaFormModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    SaA11yModule,
    SaTooltipModule,
    SaIconModule,
    SaLayoutModule,
    ScrollingModule,
    SaButtonModule,
    SaSpinnerModule,
    SaFormModule,
  ],
})
export class SaUIModule {}
