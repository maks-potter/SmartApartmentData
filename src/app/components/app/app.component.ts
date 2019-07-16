import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sa-app',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column',
  },
})
export class SaAppComponent {
}
