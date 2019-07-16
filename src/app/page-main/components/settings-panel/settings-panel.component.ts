import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SA_PLACEMENTS } from '@ui-simple/tooltip-module/constants/positions.constant';

import { ISettingsPanelItem, SA_SETTINGS_PANEL_ITEMS } from './constants/settings-panel.constant';

@Component({
  selector: 'sa-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['settings-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column',
  },
})
export class SaSettingsPanelComponent {
  SA_PLACEMENTS: typeof SA_PLACEMENTS = SA_PLACEMENTS;

  SA_SETTINGS_PANEL_ITEMS: ISettingsPanelItem[] = SA_SETTINGS_PANEL_ITEMS;

  trackById (index: number, item: ISettingsPanelItem): string {
    return item.id;
  }
}
