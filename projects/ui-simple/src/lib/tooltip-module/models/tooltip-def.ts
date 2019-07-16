import {
  ComponentType,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayRef,
  ScrollDispatcher,
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, EventEmitter, Injector, NgZone } from '@angular/core';
import { SA_FADE_ANIMATION_STATES } from '@ui-simple/animations/animations';
import {
  SaTooltipContainerComponent,
} from '@ui-simple/tooltip-module/components/tooltip-container/tooltip-container.component';
import {
  SA_DEFAULT_POSITIONS,
  SA_PLACEMENTS,
  SA_POSITION_MAP,
} from '@ui-simple/tooltip-module/constants/positions.constant';
import {
  SA_TOOLTIP_DATA,
  SA_TOOLTIP_SELECTOR_CLASS,
  SA_TOOLTIP_VIEW_PORT_MARGIN,
} from '@ui-simple/tooltip-module/constants/tooltip.constant';
import { SA_TOOLTIP_TRIGGERS } from '@ui-simple/tooltip-module/constants/triggers.constant';
import { SaTooltipConfig } from '@ui-simple/tooltip-module/models/tooltip-config';
import { fromEvent, fromEventPattern, Subject, timer } from 'rxjs';
import { debounce, filter, takeUntil } from 'rxjs/operators';
import * as uuid from 'uuid';

interface ISaTooltipTask {
  delay: number;
  isOrigin: boolean;
  isEnter: boolean;
}

export class SaTooltipDef<T> {
  onChangeVisibility: EventEmitter<boolean> = new EventEmitter();
  isDestroyed: boolean                      = false;

  get component (): T {
    return this._componentRef && this._componentRef.instance;
  }

  get id (): string {
    return this._id;
  }

  get placement (): SA_PLACEMENTS {
    return this._placement || this._config.placement;
  }

  get triggerElement (): HTMLElement {
    return this._triggerElementRef.nativeElement;
  }

  private _id: string                       = uuid.v4();
  private readonly _destroy$: Subject<void> = new Subject();
  private _destroyComponent$: Subject<void>;
  private _containerComponent: SaTooltipContainerComponent;
  private _componentRef: ComponentRef<T>;

  private _visibilitySubject$: Subject<ISaTooltipTask> = new Subject<ISaTooltipTask>();
  private _overlayRef: OverlayRef;
  private _placement: SA_PLACEMENTS;

  constructor (
    private _componentType: ComponentType<T>,
    private _triggerElementRef: ElementRef,
    private _config: Partial<SaTooltipConfig>,
    private _overlay: Overlay,
    private _scrollDispatcher: ScrollDispatcher,
    private _injector: Injector,
    private _ngZone: NgZone,
  ) {
    this.registerTriggerHandlers();

    this._config.positions = this._config.positions || [...SA_DEFAULT_POSITIONS];
    this._placement        = this._config.placement;

    const position = SA_POSITION_MAP[this._placement];

    if (!this.positionIsEquals(position, this._config.positions[0])) {
      this._config.positions.unshift(position);
    }

    this._visibilitySubject$
      .pipe(
        debounce((task) => timer(task.delay > 0 ? task.delay * 1000 : 0)),
        takeUntil(this._destroy$),
      )
      .subscribe(({ isEnter }: ISaTooltipTask) => {
        isEnter ? this.show() : this.hide();
      });
  }

  show (): void {
    if (this._config.isDisabled || this.component) {
      return;
    }

    this._destroyComponent$ = new Subject();

    this.initComponent();
    this.registerOverlayHandlers();

    this.onChangeVisibility.emit(true);
  }

  hide (): void {
    if (this._containerComponent) {
      this._containerComponent.hide();
    }
  }

  update (config: Partial<SaTooltipConfig>): void {
    this._config = { ...this._config, ...config };

    if (this.component) {
      this._overlayRef.dispose();

      if (!this._config.isDisabled) {
        this.show();
      }
    }
  }

  updatePosition (): void {
    if (this._overlayRef) {
      this._overlayRef.updatePosition();
    }
  }

  destroy (): void {
    if (this.isDestroyed) {
      return;
    }

    this._destroy$.next();
    this._destroy$.complete();

    this.isDestroyed = true;

    if (this._overlayRef) {
      this._overlayRef.dispose();

      this.onChangeVisibility.emit(false);
    }
  }

  get config (): Partial<SaTooltipConfig> {
    return this._config;
  }

  private get _componentInjector (): Injector {
    const userInjector = this._config && this._config.viewContainerRef && this._config.viewContainerRef.injector;

    return userInjector || this._injector;
  }

  private registerTriggerHandlers (): void {
    switch (this._config.trigger) {
      case SA_TOOLTIP_TRIGGERS.HOVER:
        this.registerHoverHandlers();
        break;

      case SA_TOOLTIP_TRIGGERS.CLICK:
        this.registerClickHandlers();
        break;
    }
  }

  private registerHoverHandlers (): void {
    fromEvent(this.triggerElement, 'mouseenter')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => this.changeVisibility(true, true, this._config.mouseEnterDelay));

    fromEvent(this.triggerElement, 'mouseleave')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.changeVisibility(false, true, this._config.mouseLeaveDelay);
      });
  }

  private registerClickHandlers (): void {
    fromEvent(this.triggerElement, 'click')
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((event) => {
        event.preventDefault();

        this.changeVisibility(true, true);
      });
  }

  private registerOverlayHandlers (): void {
    switch (this._config.trigger) {
      case SA_TOOLTIP_TRIGGERS.HOVER:
        this.registerOverlayHoverHandlers();
        break;

      case SA_TOOLTIP_TRIGGERS.CLICK:
        this.registerOverlayClickHandlers();
        break;
    }
  }

  private registerOverlayHoverHandlers (): void {
    if (this._config.isInteractive) {
      const overlayElement = this._overlayRef.overlayElement;

      fromEvent(overlayElement, 'mouseenter')
        .pipe(
          takeUntil(this._destroyComponent$),
        )
        .subscribe(() => this.changeVisibility(true, false));

      fromEvent(overlayElement, 'mouseleave')
        .pipe(
          filter((event: MouseEvent) => !this.triggerElement.contains(event.relatedTarget as Node)),
          takeUntil(this._destroyComponent$),
        )
        .subscribe(() => this.changeVisibility(false, false));
    }
  }

  private registerOverlayClickHandlers (): void {
    if (this._config.hasBackdrop) {
      return;
    }

    fromEventPattern(
      (handler: EventListener) => {
        document.addEventListener('click', handler, true);
      },
      (handler: EventListener) => {
        document.removeEventListener('click', handler, true);
      },
    )
      .pipe(
        takeUntil(this._destroyComponent$),
      )
      .subscribe((event: MouseEvent) => {
        if (this._containerComponent.nativeElement.contains(event.target as HTMLElement)) {
          return;
        }

        this.changeVisibility(false, true);
      });
  }

  private initComponent (): void {
    this.createOverlay();

    this.attachContainer();
    this.attachComponent();

    this._containerComponent.show();
    this._overlayRef.updatePosition();
  }

  private attachContainer (): void {
    const injector = new PortalInjector(
      this._componentInjector,
      new WeakMap([[SaTooltipConfig, this._config]]),
    );

    const portal = new ComponentPortal(SaTooltipContainerComponent, this._config.viewContainerRef, injector);

    this._containerComponent = this._overlayRef.attach(portal).instance;

    this._containerComponent.animationDone
      .pipe(
        takeUntil(this._destroyComponent$),
      )
      .subscribe((event) => {
        if (event.toState === SA_FADE_ANIMATION_STATES.EXIT) {
          this._overlayRef.dispose();

          this.onChangeVisibility.emit(false);
        }
      });
  }

  private attachComponent (): void {
    const injectionTokens = new WeakMap<any, any>([
      [SaTooltipContainerComponent, this._containerComponent],
      [SA_TOOLTIP_DATA, this._config.data],
      [SaTooltipDef, this],
    ]);

    const injector = new PortalInjector(this._componentInjector, injectionTokens);
    const portal   = new ComponentPortal(this._componentType, null, injector);

    this._componentRef = this._containerComponent.attachComponentPortal<T>(portal);
  }

  private createOverlay (): void {
    this._overlayRef = this._overlay.create({
      positionStrategy: this.createPositionStrategy(),
      hasBackdrop: this._config.hasBackdrop,
      backdropClass: this._config.backdropClass,
      scrollStrategy: this._config.scrollStrategy(),
    });

    if (!this._config.isInteractive) {
      this._overlayRef.overlayElement.style.pointerEvents = 'none';
    }

    this._overlayRef.detachments()
      .pipe(
        takeUntil(this._destroyComponent$),
      )
      .subscribe(() => {
        this.detach();
      });

    if (this._config.hasBackdrop) {
      this._overlayRef.backdropClick()
        .pipe(
          takeUntil(this._destroyComponent$),
        )
        .subscribe(() => {
          this.hide();
        });
    }
  }

  private createPositionStrategy (): FlexibleConnectedPositionStrategy {
    const scrollableAncestors = this._scrollDispatcher
      .getAncestorScrollContainers(this._triggerElementRef);

    const positionStrategy = this._overlay.position()
      .flexibleConnectedTo(this._triggerElementRef)
      .withPositions(this._config.positions)
      .withTransformOriginOn(`.${SA_TOOLTIP_SELECTOR_CLASS}`)
      .withViewportMargin(SA_TOOLTIP_VIEW_PORT_MARGIN)
      .withScrollableContainers(scrollableAncestors);

    positionStrategy.positionChanges
      .pipe(
        takeUntil(this._destroyComponent$),
      )
      .subscribe(change => {
        this.onChangePosition(change);
      });

    return positionStrategy;
  }

  private onChangePosition (change: ConnectedOverlayPositionChange): void {
    if (change.scrollableViewProperties.isOverlayClipped && this._containerComponent.isVisible) {
      // After position changes occur and the overlay is clipped by
      // a parent scrollable then close the tooltip.
      this._ngZone.run(() => this.hide());

      return;
    }

    if (this._containerComponent) {
      for (const key in SA_POSITION_MAP) {
        if (this._placement !== key && this.positionIsEquals(change.connectionPair, SA_POSITION_MAP[key])) {
          this._placement = key as SA_PLACEMENTS;

          this._componentRef.injector.get(ChangeDetectorRef).detectChanges();

          break;
        }
      }
    }
  }

  private positionIsEquals (first: ConnectionPositionPair, second: ConnectionPositionPair): boolean {
    return first.originX === second.originX &&
      first.originY === second.originY &&
      first.overlayX === second.overlayX &&
      first.overlayY === second.overlayY;
  }

  private detach (): void {
    this._destroyComponent$.next();
    this._destroyComponent$.complete();

    this._overlayRef         = null;
    this._destroyComponent$  = null;
    this._containerComponent = null;
    this._componentRef       = null;
    this._placement          = null;
  }

  private changeVisibility (isEnter: boolean, isOrigin: boolean, delay: number = -1): void {
    this._visibilitySubject$.next({
      isEnter, isOrigin, delay,
    });
  }
}
