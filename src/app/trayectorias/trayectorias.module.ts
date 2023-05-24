import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TrayectoriasRoutingModule } from './trayectorias-routing.module';
import { EjecucionComponent } from './pages/ejecucion/ejecucion.component';





@NgModule({
  declarations: [
    EjecucionComponent
  ],
  imports: [
    CommonModule,
    TrayectoriasRoutingModule,

  ]
})
export class TrayectoriasModule { }
