import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { SA_FADE_ANIMATION, SA_FADE_ANIMATION_STATES } from '@ui-simple/animations/animations';

import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { SA_TOOLTIP_SELECTOR_CLASS } from '@ui-simple/tooltip-module/constants/tooltip.constant';
import { SaTooltipConfig } from '@ui-simple/tooltip-module/models/tooltip-config';

const SA_TOOLTIP_CONTAINER_CLASS = 'sa-tooltip-container';

@Component({
  selector: 'sa-tooltip-container',
  templateUrl: 'tooltip-container.component.html',
  styleUrls: ['tooltip-container.component.less'],
  animations: [SA_FADE_ANIMATION],
  preserveWhitespaces: false,
  host: {
    class: SA_TOOLTIP_SELECTOR_CLASS,
  },
})
export class SaTooltipContainerComponent {
  styles: {};
  className: string;
  state: SA_FADE_ANIMATION_STATES = SA_FADE_ANIMATION_STATES.ENTER;

  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  animationDone: EventEmitter<AnimationEvent> = new EventEmitter<AnimationEvent>();
  isVisible: boolean;

  get nativeElement (): HTMLElement {
    return this._elementRef.nativeElement;
  }

  constructor (
    private _elementRef: ElementRef<HTMLElement>,
    private _changeDetectorRef: ChangeDetectorRef,
    private _config: SaTooltipConfig,
  ) {
    this.setProps();
  }

  setProps (): void {
    this.className = `${this._config.class} ${SA_TOOLTIP_SELECTOR_CLASS}`;

    if (this._config.isInteractive) {
      this.className += ` ${SA_TOOLTIP_CONTAINER_CLASS}--interactive`;
    }

    this.styles = this._config.styles || {};
  }

  onAnimationDone (event: AnimationEvent): void {
    this.isVisible = (event.toState === SA_FADE_ANIMATION_STATES.ENTER);

    this.animationDone.emit(event);
  }

  attachComponentPortal<T> (portal: ComponentPortal<T>): ComponentRef<T> {
    return this.tryAttachPortal(() => this.portalOutlet.attachComponentPortal(portal));
  }

  show (): void {
    this.state = SA_FADE_ANIMATION_STATES.ENTER;

    this._changeDetectorRef.detectChanges();
  }

  hide (): void {
    this.state = SA_FADE_ANIMATION_STATES.EXIT;

    this._changeDetectorRef.detectChanges();
  }

  private tryAttachPortal<T> (attachFn: () => T): T {
    if (this.portalOutlet.hasAttached()) {
      throw Error('Attempting to attach tooltip content after content is already attached');
    }

    return attachFn();
  }
}
