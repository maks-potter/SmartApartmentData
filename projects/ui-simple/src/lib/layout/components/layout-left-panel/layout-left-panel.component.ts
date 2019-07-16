import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Mediator } from '@sa-core/services/mediator.service';
import {
  SA_SLIDE_LEFT_TO_RIGHT_ANIMATION,
  SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES,
} from '@ui-simple/animations/animations';
import { SaLayoutLeftPanelActions } from '@ui-simple/layout/actions/layout-left-panel.actions';
import { Subject } from 'rxjs/Subject';

const SA_CLOSE_SIDEBAR_TOOLTIP = 'Close sidebar';

@Component({
  selector: 'sa-layout-with-left-panel',
  templateUrl: './layout-left-panel.component.html',
  styleUrls: ['./layout-left-panel.component.less'],
  animations: [SA_SLIDE_LEFT_TO_RIGHT_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex',
  },
})
export class SaLayoutWithLeftPanelComponent implements OnInit, OnDestroy {
  @Input('saLeftPanelColorMode') leftPanelColorMode: string;
  @Input('saLeftPanelContentColorMode') sidebarColorMode: string;

  state: SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES = SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.LEFT;
  SA_CLOSE_SIDEBAR_TOOLTIP: string               = SA_CLOSE_SIDEBAR_TOOLTIP;

  sidebarTitle: string;
  isVisibleSidebar: boolean;

  private readonly _destroy$: Subject<void> = new Subject<void>();

  constructor (
    private _changeDetectorRef: ChangeDetectorRef,
    private _mediator: Mediator,
  ) {
  }

  ngOnInit (): void {
    this._mediator.ofAction(SaLayoutLeftPanelActions.ShowSidebar, this._destroy$)
      .subscribe(({ sidebarTitle}: { sidebarTitle: string }) => {
        this.sidebarTitle = sidebarTitle;

        this.showContentPanel();
      });

    this._mediator.ofAction(SaLayoutLeftPanelActions.HideSidebar, this._destroy$)
      .subscribe(() => this.hideContentPanel());
  }

  ngOnDestroy (): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onAnimationDone (event: AnimationEvent): void {
    this.isVisibleSidebar = (event.toState === SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.LEFT);
  }

  showContentPanel (): void {
    this.state            = SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.LEFT;
    this.isVisibleSidebar = true;

    this._changeDetectorRef.detectChanges();

    this._mediator.dispatch(new SaLayoutLeftPanelActions.SidebarShowed());
  }

  hideContentPanel (): void {
    this.state            = SA_SLIDE_LEFT_TO_RIGHT_ANIMATION_STATES.RIGHT;
    this.isVisibleSidebar = false;

    this._changeDetectorRef.detectChanges();

    this._mediator.dispatch(new SaLayoutLeftPanelActions.SidebarHidden());
  }
}
