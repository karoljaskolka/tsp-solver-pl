import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCities } from './core/store/cities.actions';
import { AppState } from './core/store/state';

@Component({
  selector: 'tsp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
	constructor(private store: Store<AppState>) {}

	ngOnInit() {
		this.store.dispatch(loadCities());
	}
}
