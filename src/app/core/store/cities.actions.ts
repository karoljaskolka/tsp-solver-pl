import { createAction, props } from '@ngrx/store';
import { CityDto } from '../dto/city';

export const loadCities = createAction('[Cities] Load');
export const setCities = createAction('[Cities] Set', props<{ cities: CityDto[] }>());
