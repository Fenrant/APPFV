import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocRoutingModule } from './doc-routing.module';
import { ArquitecturaComponent } from './pages/arquitectura/arquitectura.component';


@NgModule({
  declarations: [
    ArquitecturaComponent
  ],
  imports: [
    CommonModule,
    DocRoutingModule
  ]
})
export class DocModule { }
