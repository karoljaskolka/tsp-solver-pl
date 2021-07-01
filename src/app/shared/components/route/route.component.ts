import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CityDto } from 'src/app/core/dto/city';
import { CitiesService } from 'src/app/core/services/cities.service';
import { calcDistance, getRouteDistance } from 'src/app/utils/distance';

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

  calcDistance(from: CityDto, to: CityDto): number {
    return calcDistance(from, to);
  }

  getRouteDistance(): number {
    return getRouteDistance(this.currRoute, this.cities);
  }

}
