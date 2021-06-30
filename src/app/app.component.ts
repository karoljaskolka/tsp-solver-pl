import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tsp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

}
