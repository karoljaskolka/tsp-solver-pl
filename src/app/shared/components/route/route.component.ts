import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CityDto } from 'src/app/core/dto/city';
import { calcDistance, getRouteDistance } from 'src/app/utils/distance';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCities } from 'src/app/core/store/cities.selectors';
import { AppState } from 'src/app/core/store/state';

@Component({
  selector: 'tsp-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteComponent implements OnInit, OnDestroy {
  @Input() currRoute: Array<number> = [];

  cities: Array<CityDto> = [];
  citiesSub$: Subscription;

  constructor(private cdRef: ChangeDetectorRef, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.citiesSub$ = this.store.select(selectCities).subscribe(cities => {
      this.cities = cities;
      this.cdRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.citiesSub$.unsubscribe();
  }

  calcDistance(from: CityDto, to: CityDto): number {
    return calcDistance(from, to);
  }

  getRouteDistance(): number {
    return getRouteDistance(this.currRoute, this.cities);
  }

}
