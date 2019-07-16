import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SaA11yModule } from '@ui-simple/a11y/a11y.module';
import { SaButtonModule } from '@ui-simple/buttons/button.module';
import { SaErrorComponent } from '@ui-simple/form-components/error/error.component';
import { SaFormFieldComponent } from '@ui-simple/form-components/form-field/form-field.component';
import { SaInputComponent } from '@ui-simple/form-components/input/input.component';
import { SaLabelComponent } from '@ui-simple/form-components/label/label.component';
import { SaErrorMessageMatcher } from '@ui-simple/form-components/services/error-message-matcher';
import { SaIconModule } from '@ui-simple/icon/icon.module';
import { SaSpinnerModule } from '@ui-simple/spinner/spinner.module';
import { SaTooltipModule } from '@ui-simple/tooltip-module/tooltip.module';

@NgModule({
  imports: [
    CommonModule,
    SaA11yModule,
    SaIconModule,
    SaSpinnerModule,
    SaButtonModule,
    ReactiveFormsModule,
    SaTooltipModule,
  ],
  declarations: [
    SaInputComponent,
    SaFormFieldComponent,
    SaLabelComponent,
    SaErrorComponent,
  ],
  exports: [
    SaInputComponent,
    SaFormFieldComponent,
    SaLabelComponent,
    SaErrorComponent,
  ],
  providers: [
    SaErrorMessageMatcher,
  ],
})
export class SaFormModule {}
