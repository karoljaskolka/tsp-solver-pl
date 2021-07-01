import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CityDto } from 'src/app/core/dto/city';
import { CitiesService } from 'src/app/core/services/cities.service';
import { getRouteDistance } from 'src/app/utils/distance';
import { insert, invert, swap } from 'src/app/utils/operations';
import { getRandomRoute } from 'src/app/utils/route';

@Component({
  selector: 'tsp-local-search-solver',
  templateUrl: './local-search-solver.component.html',
  styleUrls: ['./local-search-solver.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocalSearchSolverComponent implements OnInit {
  bestRoute: Array<number> = [];
  currRoute: Array<number> = [];

  cities: CityDto[];
  isRunning: boolean = false;

  form: FormGroup = new FormGroup({
    operation: new FormControl('swap'),
    iterations: new FormControl(15)
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

  constructor(private citiesService: CitiesService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(cities => {
      this.cities = cities;
      this.cdRef.markForCheck();
    });
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
          if (this.operation === 'swap') { this.currRoute = swap([...route], i, j); }
          if (this.operation === 'insert') { this.currRoute = insert([...route], i, j); }
          if (this.operation === 'invert') { this.currRoute = invert([...route], i, j); }
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
