import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CImagenesRoutingModule } from './cimagenes-routing.module';
import { MostrarComponent } from './pages/mostrar/mostrar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MostrarComponent
  ],
  imports: [
    CommonModule,
    CImagenesRoutingModule,
    NgbModule
  ]
})
export class CImagenesModule { }
