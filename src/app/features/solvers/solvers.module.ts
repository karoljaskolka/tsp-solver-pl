import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolversRoutingModule } from './solvers-routing.module';
import { NearestNeighbourSolverComponent } from './nearest-neighbour-solver/nearest-neighbour-solver.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NearestNeighbourSolverComponent
  ],
  imports: [
    CommonModule,
    SolversRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SolversModule { }
