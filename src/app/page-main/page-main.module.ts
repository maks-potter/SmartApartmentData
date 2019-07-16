import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SaUIModule } from '@ui-simple/ui.module';

import { SaMainPanelComponent } from './components/main-panel/main-panel.component';
import { SaPageMainComponent } from './components/main/page-main.component';
import { SaSettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { SaSidebarCatalogComponent } from './components/sidebar-catalog/sidebar-catalog.component';
import { SaStartViewComponent } from './components/start-view/start-view.component';
import { SaPageMainRoutingModule } from './page-main.routing';

@NgModule({
  imports: [
    CommonModule,
    SaPageMainRoutingModule,
    SaUIModule,
  ],
  declarations: [
    SaPageMainComponent,
    SaStartViewComponent,
    SaMainPanelComponent,
    SaSettingsPanelComponent,
    SaSidebarCatalogComponent,
  ],
})
export class SaPageMainModule {}
