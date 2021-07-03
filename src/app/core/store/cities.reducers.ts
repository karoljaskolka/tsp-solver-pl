import { createReducer, on } from '@ngrx/store';
import { loadCities, setCities } from './cities.actions';

export const initialState = [];

const _citiesReducer = createReducer(
    initialState,
    on(loadCities, (state) => []),
    on(setCities, (state, { cities }) => cities)
);

export function citiesReducer(state, action) {
    return _citiesReducer(state, action);
}
