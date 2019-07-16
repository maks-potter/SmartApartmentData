import { ChangeDetectionStrategy, Component, Inject, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SA_TOOLTIP_DATA } from '@ui-simple/tooltip-module/constants/tooltip.constant';
import { ISaTooltipData } from '@ui-simple/tooltip-module/interfaces/tooltip.interface';
import { SaTooltipDef } from '@ui-simple/tooltip-module/models/tooltip-def';

@Component({
  selector: 'sa-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.less'],
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaTooltipComponent {
  get className (): string {
    const className = this.data.class || '';

    return `${className} sa-position--${this._tooltipDef.placement}`;
  }

  set content (value: SafeHtml | TemplateRef<any>) {
    if (this._content === value) {
      return;
    }

    this._isContentString = !(value instanceof TemplateRef);
    this._content         = this._isContentString ? this._domSanitizer.bypassSecurityTrustHtml(value as string) : value;
  }

  get content (): SafeHtml | TemplateRef<any> {
    return this._content;
  }

  get isContentString (): boolean {
    return this._isContentString;
  }

  get isShowArrow (): boolean {
    return this._tooltipDef.config.isShowArrow;
  }

  private _content: SafeHtml | TemplateRef<any>;
  private _isContentString: boolean;

  constructor (
    @Inject(SA_TOOLTIP_DATA) public data: ISaTooltipData,
    protected _tooltipDef: SaTooltipDef<SaTooltipComponent>,
    protected _domSanitizer: DomSanitizer,
  ) {
    this.content = this.data.content;
  }
}
