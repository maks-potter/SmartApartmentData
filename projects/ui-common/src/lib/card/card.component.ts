import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sa-card',
  templateUrl: './card.component.html',
  styleUrls: ['card.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column',
  },
})
export class SaCardComponent {
  @Input('saIcon') icon: string;
  @Input('saTitle') title: string;
  @Input('saText') text: string;
}
