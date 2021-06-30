import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CityDto } from 'src/app/core/dto/city';
import { CitiesService } from 'src/app/core/services/cities.service';
import { calcDistance } from 'src/app/utils/distance';

@Component({
  selector: 'tsp-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteComponent implements OnInit {
  @Input() currRoute: Array<number> = [];

  cities: Array<CityDto> = [];

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

  getRouteDistance() {
    let distance = 0;
    this.currRoute.forEach((city, i) => {
      if (i !== this.currRoute.length - 1) {
        distance += this.calcDistance(this.cities[this.currRoute[i]], this.cities[this.currRoute[i + 1]])
      } else {
        distance += this.calcDistance(this.cities[this.currRoute[this.currRoute.length - 1]], this.cities[this.currRoute[0]])
      }
    })
    return distance;
  }

}
