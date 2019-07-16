import { NgModule } from '@angular/core';

import { SaButtonClickDirective } from './button-click/button-click.directive';

@NgModule({
  declarations: [
    SaButtonClickDirective,
  ],
  exports: [
    SaButtonClickDirective,
  ],
})
export class SaA11yModule {}
