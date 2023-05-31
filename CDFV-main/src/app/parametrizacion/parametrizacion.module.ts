import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DatauploadComponent } from './pages/dataupload/dataupload.component';
import { ResultLogsComponent } from './pages/result-logs/result-logs.component';
import { ParaRoutingModule } from './para-routing.module';
import { FormComponent } from './pages/dataupload/form.component';
import { AlgoritmoComponent } from './pages/algoritmo/algoritmo.component';
import { FormalgComponent } from './pages/algoritmo/formalg.component';
import { EjemploComponent } from './pages/algoritmo/ejemplo.component';

@NgModule({
  declarations: [
    DatauploadComponent,
    ResultLogsComponent,
    FormComponent,
    AlgoritmoComponent,
    FormalgComponent,
    EjemploComponent
  ],
  imports: [
    CommonModule,
    ParaRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class ParametrizacionModule { }
