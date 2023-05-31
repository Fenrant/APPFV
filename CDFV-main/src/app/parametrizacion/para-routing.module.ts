import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlgoritmoComponent } from './pages/algoritmo/algoritmo.component';
import { EjemploComponent } from './pages/algoritmo/ejemplo.component';
import { FormalgComponent } from './pages/algoritmo/formalg.component';
import { DatauploadComponent } from './pages/dataupload/dataupload.component';
import { FormComponent } from './pages/dataupload/form.component';
import { ResultLogsComponent } from './pages/result-logs/result-logs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'dataupload', component: DatauploadComponent},
      {path: 'algoritmo', component: AlgoritmoComponent},
      {path: 'ejemplo/:algid', component: EjemploComponent},
      {path: 'ejemplo/:algid/:id', component: EjemploComponent},
      {path: 'dataupload/form', component: FormComponent},
      {path: 'algoritmo/form', component: FormalgComponent},
      {path: 'dataupload/form/:id', component: FormComponent},
      {path: 'algoritmo/form/:id', component: FormalgComponent},
      {path: 'resultlogs', component: ResultLogsComponent},
      {path: '**', redirectTo: 'dataupload'}
    ]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ParaRoutingModule { }
