import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArquitecturaComponent } from './pages/arquitectura/arquitectura.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'arq', component: ArquitecturaComponent},
      {path: '**', redirectTo: 'arq'}
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class DocRoutingModule { }
