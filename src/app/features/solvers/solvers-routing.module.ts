import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NearestNeighbourSolverComponent } from './nearest-neighbour-solver/nearest-neighbour-solver.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nearest-neighbour',
    pathMatch: 'full'
  },
  {
    path: 'nearest-neighbour',
    component: NearestNeighbourSolverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolversRoutingModule { }
