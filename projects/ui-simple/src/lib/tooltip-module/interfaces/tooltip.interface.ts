import { TemplateRef } from '@angular/core';

export interface ISaTooltipData {
  content: string | TemplateRef<void>;
  class?: string;
  styles?: { [key: string]: string };
  noArrow?: boolean;
}
