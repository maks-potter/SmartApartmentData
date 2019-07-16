import { ChangeDetectionStrategy, Component } from '@angular/core';

import { IMainPanelItem } from '../../../page-main/components/main-panel/constants/main-panel.constant';
import { ICatalogItem, SA_CATALOG_ITEMS } from '../../constants/catalog.constant';

@Component({
  selector: 'sa-page-catalog',
  templateUrl: './page-catalog.component.html',
  styleUrls: ['page-catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column g-flex-column__item',
  },
})
export class SaPageCatalogComponent {
  SA_CATALOG_ITEMS: ICatalogItem[] = SA_CATALOG_ITEMS;

  trackById (index: number, item: IMainPanelItem): string {
    return item.id;
  }
}
