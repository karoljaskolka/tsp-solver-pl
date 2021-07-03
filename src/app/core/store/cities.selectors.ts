import { createSelector } from '@ngrx/store';
import { CityDto } from '../dto/city';
import { AppState } from './state';

export const selectCities = (state: AppState) => state.cities;
export const selectCity = (index) => createSelector(
    selectCities,
    (cities: CityDto[]) => {
        return cities[index];
    }
);
