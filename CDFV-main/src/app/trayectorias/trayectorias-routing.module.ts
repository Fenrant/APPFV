import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjecucionComponent } from './pages/ejecucion/ejecucion.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {path:'prueba', component: EjecucionComponent},
      {path:'prueba/:id', component: EjecucionComponent},
      {path:'**', redirectTo:'prueba'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrayectoriasRoutingModule { }
