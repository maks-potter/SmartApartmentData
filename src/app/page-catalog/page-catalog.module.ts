import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SaUICommonModule } from '@ui-common/ui-common.module';
import { SaUIModule } from '@ui-simple/ui.module';

import { SaPageCatalogComponent } from './components/catalog/page-catalog.component';
import { SaPageCatalogRoutingModule } from './page-catalog.routing';

@NgModule({
  imports: [
    CommonModule,
    SaUIModule,
    SaUICommonModule,
    SaPageCatalogRoutingModule,
  ],
  declarations: [
    SaPageCatalogComponent,
  ],
})
export class SaPageCatalogModule {}
