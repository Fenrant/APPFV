import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosRoutingModule } from './datos-routing.module';
import { AnalisisComponent } from './pages/analisis/analisis.component';
import { GraficoComponent } from './pages/grafico/grafico.component';


@NgModule({
  declarations: [
    AnalisisComponent,
    GraficoComponent
  ],
  imports: [
    CommonModule,
    DatosRoutingModule
  ]
})
export class DatosModule { }
