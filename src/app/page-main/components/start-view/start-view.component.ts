import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sa-start-view',
  templateUrl: './start-view.component.html',
  styleUrls: ['start-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column__item',
  },
})
export class SaStartViewComponent {
}
