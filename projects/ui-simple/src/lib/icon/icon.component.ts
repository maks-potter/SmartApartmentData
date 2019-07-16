import { Component, Input } from '@angular/core';

@Component({
  selector: 'sa-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less'],
  host: {
    role: 'img',
  },
})
export class SaIconComponent {
  @Input('saIcon') icon: string;
}
