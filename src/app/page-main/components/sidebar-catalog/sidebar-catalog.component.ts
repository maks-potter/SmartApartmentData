import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mediator } from '@sa-core/services/mediator.service';
import { SaLayoutLeftPanelActions } from '@ui-simple/layout/actions/layout-left-panel.actions';

import { ISidebarCatalogItem, SA_SIDEBAR_CATALOG_ITEMS } from './constants/sidebar-catalog.constant';

@Component({
  selector: 'sa-sidebar-catalog',
  templateUrl: './sidebar-catalog.component.html',
  styleUrls: ['sidebar-catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column',
  },
})
export class SaSidebarCatalogComponent {
  SA_SIDEBAR_CATALOG_ITEMS: ISidebarCatalogItem[] = SA_SIDEBAR_CATALOG_ITEMS;

  constructor (
    private _router: Router,
    private _mediator: Mediator,
  ) {
  }

  trackById (index: number, item: ISidebarCatalogItem): string {
    return item.id;
  }

  selectItem (selectedItem: ISidebarCatalogItem): void {
    this._mediator.dispatch(new SaLayoutLeftPanelActions.HideSidebar());

    this._router.navigate([`/${selectedItem.route}`]);
  }
}
