import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CitiesService } from '../services/cities.service';
import { loadCities, setCities } from './cities.actions';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class CitiesEffects {
    loadCities$ = createEffect(() => this.actions$
        .pipe(
            ofType(loadCities),
            mergeMap(() => this.citiesService.getCities()
                .pipe(
                    map(cities => setCities({cities})),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private citiesService: CitiesService
    ) {}
}
