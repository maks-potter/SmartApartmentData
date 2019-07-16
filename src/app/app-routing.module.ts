import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SaErrorPageComponent } from './components/error-page/error-page.component';
import { SA_APP_ROUTE_URLS } from './constants/route-urls.constant';

const SA_APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: './page-main/page-main.module#SaPageMainModule',
  },
  {
    path: SA_APP_ROUTE_URLS.ERROR,
    component: SaErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: SA_APP_ROUTE_URLS.ERROR,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(SA_APP_ROUTES),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
