import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { RouteComponent } from './components/route/route.component';

const COMPONENTS = [
  MapComponent,
  HeaderComponent,
  RouteComponent
]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [COMPONENTS]
})
export class SharedModule { }
