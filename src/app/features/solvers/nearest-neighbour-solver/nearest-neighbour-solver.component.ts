import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CityDto } from 'src/app/core/dto/city';
import { CitiesService } from 'src/app/core/services/cities.service';
import { calcDistance } from 'src/app/utils/distance';

@Component({
  selector: 'tsp-nearest-neighbour-solver',
  templateUrl: './nearest-neighbour-solver.component.html',
  styleUrls: ['./nearest-neighbour-solver.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NearestNeighbourSolverComponent implements OnInit {
  currRoute: Array<number> = [];

  cities: CityDto[];
  delayTime: number = 250;
  isRunning: boolean = false;

  startCity: FormControl = new FormControl(0);

  constructor(private citiesService: CitiesService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(cities => {
      this.cities = cities;
      this.cdRef.markForCheck();
    });
  }

  calcDistance(from: CityDto, to: CityDto) {
    return calcDistance(from, to);
  }

  async solve() {
    this.isRunning = true;
    let leftCities = Array.from(Array(18).keys()).filter(index => index != this.startCity.value);
    this.currRoute = [];
    this.currRoute.push(this.startCity.value); 
    while (leftCities.length) {
      await this.delay();
      const nearestNeighbourIndex = this.getNearestNeighbour(this.currRoute[this.currRoute.length - 1], leftCities)
      this.currRoute = this.currRoute.concat(nearestNeighbourIndex);
      leftCities = leftCities.filter(index => index != nearestNeighbourIndex);
      this.cdRef.markForCheck();
    }
    this.isRunning = false;
  }

  getNearestNeighbour(cityIndex: number, leftCities: number[]) {
    let nearestNeighbourIndex = leftCities[0];
    let nearestNeighbourDistance = calcDistance(this.cities[cityIndex], this.cities[nearestNeighbourIndex])
    leftCities.forEach(index => {
      const distance = calcDistance(this.cities[cityIndex], this.cities[index])
      if (distance < nearestNeighbourDistance) {
        nearestNeighbourIndex = index;
        nearestNeighbourDistance = distance;
      }
    })
    return nearestNeighbourIndex;
  }

  clear() {
    this.currRoute = [];
  }

  async delay() {
    return new Promise((res) => setTimeout(res, this.delayTime));
  }

}
