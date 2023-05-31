import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalisisComponent } from './pages/analisis/analisis.component';
import { GraficoComponent } from './pages/grafico/grafico.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'analisis', component: AnalisisComponent},
      {path: 'grafico', component: GraficoComponent},
      {path: '**', redirectTo: 'analisis'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosRoutingModule { }
