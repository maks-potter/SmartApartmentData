import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Mediator } from '@sa-core/services/mediator.service';
import { SaLayoutLeftPanelActions } from '@ui-simple/layout/actions/layout-left-panel.actions';
import { SA_PLACEMENTS } from '@ui-simple/tooltip-module/constants/positions.constant';
import { Subject } from 'rxjs/Subject';

import { IMainPanelItem, SA_MAIN_PANEL_ITEMS } from './constants/main-panel.constant';

@Component({
  selector: 'sa-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['main-panel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column',
  },
})
export class SaMainPanelComponent implements OnInit, OnDestroy {
  @Output('saItemSelected') itemSelected: EventEmitter<IMainPanelItem> = new EventEmitter<IMainPanelItem>();

  SA_PLACEMENTS: typeof SA_PLACEMENTS = SA_PLACEMENTS;

  SA_SETTINGS_PANEL_ITEMS: IMainPanelItem[] = SA_MAIN_PANEL_ITEMS;

  selectedItem: IMainPanelItem;

  private _isVisibleSidebar: boolean;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor (
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _mediator: Mediator,
  ) {
  }

  ngOnInit (): void {
    this._mediator.ofAction(SaLayoutLeftPanelActions.SidebarShowed, this._destroy$)
      .subscribe(() => {
        this._isVisibleSidebar = true;
      });

    this._mediator.ofAction(SaLayoutLeftPanelActions.SidebarHidden, this._destroy$)
      .subscribe(() => {
        this._isVisibleSidebar = false;

        this.selectedItem = null;

        this.itemSelected.emit(this.selectedItem);

        this._changeDetectorRef.detectChanges();
      });
  }

  ngOnDestroy (): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  trackById (index: number, item: IMainPanelItem): string {
    return item.id;
  }

  selectItem (selectedItem: IMainPanelItem): void {
    if (this.selectedItem && this.selectedItem.id === selectedItem.id) {
      return;
    }

    this.selectedItem = selectedItem;

    this.itemSelected.emit(this.selectedItem);

    if (selectedItem.hasSidebar) {
      this._mediator.dispatch(new SaLayoutLeftPanelActions.ShowSidebar(selectedItem.label));
    } else {
      this._mediator.dispatch(new SaLayoutLeftPanelActions.HideSidebar());
    }

    if (selectedItem.route !== undefined) {
      this._router.navigate([`/${selectedItem.route}`]);
    }
  }
}
