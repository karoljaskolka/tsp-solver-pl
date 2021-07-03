import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CityDto } from 'src/app/core/dto/city';
import { selectCities } from 'src/app/core/store/cities.selectors';
import { AppState } from 'src/app/core/store/state';
import { calcDistance } from 'src/app/utils/distance';

@Component({
  selector: 'tsp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() bestRoute: Array<number> = [];
  @Input() currRoute: Array<number> = [];

  cities: CityDto[];
  citiesSub$: Subscription;

  // coords of map's edges
  long = {
    min: 14.00,
    max: 24.35
  };

  lat = {
    min: 49.00,
    max: 55.00
  };

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

  // calculate x axis based on longitude of the city and map's edges
  getCx(city: CityDto): string {
    return (((city.long - this.long.min) / (this.long.max - this.long.min)) * 100).toFixed(2) + '%';
  }

  // calculate y axis based on latitude of the city and map's edges
  getCy(city: CityDto): string {
    return (100 - ((city.lat - this.lat.min) / (this.lat.max - this.lat.min)) * 100).toFixed(2) + '%';
  }

  calcDistance(from: CityDto, to: CityDto): number {
    return calcDistance(from, to);
  }

}
