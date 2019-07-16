import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaPageCatalogComponent } from './components/catalog/page-catalog.component';

const SA_PAGE_CATALOG_ROUTES: Routes = [
  {
    path: '',
    component: SaPageCatalogComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(SA_PAGE_CATALOG_ROUTES),
  ],
  exports: [
    RouterModule,
  ],
})
export class SaPageCatalogRoutingModule {}
