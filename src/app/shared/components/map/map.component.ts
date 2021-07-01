import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { CityDto } from 'src/app/core/dto/city';
import { CitiesService } from 'src/app/core/services/cities.service';
import { calcDistance } from 'src/app/utils/distance';

@Component({
  selector: 'tsp-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {
  @Input() bestRoute: Array<number> = [];
  @Input() currRoute: Array<number> = [];

  cities: CityDto[];

  // coords of map's edges
  long = {
    min: 14.00,
    max: 24.35
  };

  lat = {
    min: 49.00,
    max: 55.00
  };

  constructor(private citiesService: CitiesService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.citiesService.getCities().subscribe(cities => {
      this.cities = cities;
      this.cdRef.markForCheck();
    });
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
