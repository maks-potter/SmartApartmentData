import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SA_APP_ROUTE_URLS } from '../../constants/route-urls.constant';

@Component({
  selector: 'sa-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'g-flex-column g-flex--align-center',
  },
})
export class SaErrorPageComponent {
  SA_APP_ROUTE_URLS: typeof SA_APP_ROUTE_URLS = SA_APP_ROUTE_URLS;
}
