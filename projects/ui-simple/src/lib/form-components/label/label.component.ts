import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sa-label',
  templateUrl: 'label.component.html',
  styleUrls: ['label.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex g-flex--align-center',
    tabindex: '-1',
  },
})
export class SaLabelComponent {
  @Input('saLabel') label: string;
  @Input('saIsRequired') isRequired: boolean;
}
