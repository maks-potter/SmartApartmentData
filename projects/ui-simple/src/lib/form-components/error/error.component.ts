import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sa-error',
  template: '<ng-content></ng-content>',
  styleUrls: ['error.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabindex: '-1',
  },
})
export class SaErrorComponent {}
