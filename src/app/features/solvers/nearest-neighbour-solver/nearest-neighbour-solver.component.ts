import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CityDto } from 'src/app/core/dto/city';
import { calcDistance } from 'src/app/utils/distance';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCities } from 'src/app/core/store/cities.selectors';
import { AppState } from 'src/app/core/store/state';

@Component({
  selector: 'tsp-nearest-neighbour-solver',
  templateUrl: './nearest-neighbour-solver.component.html',
  styleUrls: ['./nearest-neighbour-solver.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NearestNeighbourSolverComponent implements OnInit, OnDestroy {
  currRoute: Array<number> = [];

  cities: CityDto[];
  citiesSub$: Subscription;
  isRunning: boolean = false;

  form: UntypedFormGroup = new UntypedFormGroup({
    startCity: new UntypedFormControl(0),
    delayTime: new UntypedFormControl(250),
  });

  get startCity() {
    return this.form.value.startCity;
  }

  get delayTime() {
    return this.form.value.delayTime;
  }

  get delayTimeList() {
    return [100, 250, 500, 750, 1000];
  }

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

  async solve(): Promise<void> {
    this.isRunning = true;
    let leftCities = Array.from(Array(18).keys()).filter(index => index != this.startCity);
    this.currRoute = [];
    this.currRoute.push(this.startCity);
    while (leftCities.length) {
      await this.delay();
      const nearestNeighbourIndex = this.getNearestNeighbour(this.currRoute[this.currRoute.length - 1], leftCities);
      this.currRoute = this.currRoute.concat(nearestNeighbourIndex);
      leftCities = leftCities.filter(index => index != nearestNeighbourIndex);
      this.cdRef.markForCheck();
    }
    this.isRunning = false;
  }

  getNearestNeighbour(cityIndex: number, leftCities: number[]): number {
    let nearestNeighbourIndex = leftCities[0];
    let nearestNeighbourDistance = calcDistance(this.cities[cityIndex], this.cities[nearestNeighbourIndex]);
    leftCities.forEach(index => {
      const distance = calcDistance(this.cities[cityIndex], this.cities[index]);
      if (distance < nearestNeighbourDistance) {
        nearestNeighbourIndex = index;
        nearestNeighbourDistance = distance;
      }
    });
    return nearestNeighbourIndex;
  }

  clear(): void {
    this.currRoute = [];
  }

  async delay() {
    return new Promise((res) => setTimeout(res, this.delayTime));
  }

}
