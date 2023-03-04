import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { CityDto } from 'src/app/core/dto/city';
import { getRouteDistance } from 'src/app/utils/distance';
import { insert, invert, swap } from 'src/app/utils/operations';
import { getRandomRoute } from 'src/app/utils/route';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectCities } from 'src/app/core/store/cities.selectors';
import { AppState } from 'src/app/core/store/state';

@Component({
  selector: 'tsp-local-search-solver',
  templateUrl: './local-search-solver.component.html',
  styleUrls: ['./local-search-solver.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalSearchSolverComponent implements OnInit, OnDestroy {
  bestRoute: Array<number> = [];
  currRoute: Array<number> = [];

  cities: CityDto[];
  citiesSub$: Subscription;
  isRunning: boolean = false;

  form: UntypedFormGroup = new UntypedFormGroup({
    operation: new UntypedFormControl('swap'),
    iterations: new UntypedFormControl(20)
  });

  get operation() {
    return this.form.value.operation;
  }

  get iterations() {
    return this.form.value.iterations;
  }

  get operationsList() {
    return ['swap', 'insert', 'invert'];
  }

  get iterationsList() {
    return [5, 10, 15, 20, 25];
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

  async solve(): Promise<void>{
    this.isRunning = true;
    this.bestRoute = getRandomRoute(this.cities.length);
    let globalMin = getRouteDistance(this.bestRoute, this.cities);
    let changed;
    for (let i = 0; i < this.iterations; i++) {
      changed = false;
      const { route, distance } = await this.getLocalMinimum(this.bestRoute, globalMin);
      if (distance < globalMin) {
        globalMin = distance;
        this.bestRoute = route;
        this.cdRef.markForCheck();
        changed = true;
      }
      if (!changed) { break; }
    }
    this.currRoute = [];
    this.isRunning = false;
  }


  async getLocalMinimum(route: Array<number>, distance: number): Promise<{ route: Array<number>, distance: number }> {
    let bestlocalRoute: Array<number> = route;
    let localMin: number = distance;
    for (let i = 0; i < this.cities.length; i++) {
      for (let j = 0; j < this.cities.length; j++) {
        if (i !== j) {
          switch (this.operation) {
            case 'swap':
              this.currRoute = swap([...route], i, j);
              break;
            case 'insert':
              this.currRoute = insert([...route], i, j);
              break;
            case 'invert':
              this.currRoute = invert([...route], i, j);
              break;
          }
          await this.delay(1);
          this.cdRef.markForCheck();
          const localDistance = getRouteDistance(this.currRoute, this.cities);
          if (localDistance < localMin) {
            localMin = localDistance;
            bestlocalRoute = this.currRoute;
          }
        }
      }
    }
    return { route: bestlocalRoute, distance: localMin };
  }

  clear(): void {
    this.currRoute = [];
    this.bestRoute = [];
  }

  async delay(time) {
    return new Promise((res) => setTimeout(res, time));
  }
}
