import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDto } from '../dto/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getCities(): Observable<CityDto[]> {
    return this.http.get<CityDto[]>('/assets/data/cities.json');
  }
}
