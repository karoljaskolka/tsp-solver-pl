import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';

const COMPONENTS = [
  MapComponent,
  HeaderComponent
]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [COMPONENTS]
})
export class SharedModule { }
