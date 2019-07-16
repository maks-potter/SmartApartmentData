import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaPageMainComponent } from './components/main/page-main.component';
import { SaStartViewComponent } from './components/start-view/start-view.component';
import { SA_PAGE_MAIN_ROUTE_URLS } from './constants/route-urls.constant';

const SA_MAIN_PAGE_ROUTES: Routes = [
  {
    path: '',
    component: SaPageMainComponent,
    children: [
      {
        path: '',
        component: SaStartViewComponent,
      },
      {
        path: SA_PAGE_MAIN_ROUTE_URLS.CATALOG,
        loadChildren: '../page-catalog/page-catalog.module#SaPageCatalogModule',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(SA_MAIN_PAGE_ROUTES),
  ],
  exports: [
    RouterModule,
  ],
})
export class SaPageMainRoutingModule {}
