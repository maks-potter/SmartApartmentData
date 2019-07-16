import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

import { IMainPanelItem, SA_MAIN_PANEL_TYPES } from '../main-panel/constants/main-panel.constant';

@Component({
  selector: 'sa-main-page',
  templateUrl: './page-main.component.html',
  styleUrls: ['page-main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column',
  },
})
export class SaPageMainComponent {
  mainPanelSelectedItem: IMainPanelItem;

  SA_MAIN_PANEL_TYPES: typeof SA_MAIN_PANEL_TYPES = SA_MAIN_PANEL_TYPES;

  constructor (
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  mainPanelItemSelected (mainPanelSelectedItem: IMainPanelItem): void {
    this.mainPanelSelectedItem = mainPanelSelectedItem;

    this._changeDetectorRef.detectChanges();
  }
}
