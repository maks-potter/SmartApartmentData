import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sa-spinner',
  templateUrl: 'spinner.component.html',
  styleUrls: ['spinner.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaSpinnerComponent {
  @Input('saLabel') label: string;
}
