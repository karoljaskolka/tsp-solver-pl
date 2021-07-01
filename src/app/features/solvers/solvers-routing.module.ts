import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalSearchSolverComponent } from './local-search-solver/local-search-solver.component';
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
  },
  {
    path: 'local-search',
    component: LocalSearchSolverComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolversRoutingModule { }
