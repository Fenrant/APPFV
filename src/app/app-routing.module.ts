import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren : () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'doc',
    loadChildren : () => import('./doc/doc.module').then(m => m.DocModule),
  },
  {
    path: 'parametrizacion',
    loadChildren : () => import('./parametrizacion/parametrizacion.module').then(m => m.ParametrizacionModule),
  },
  {
    path: 'datos',
    loadChildren : () => import('./datos/datos.module').then(m => m.DatosModule),
  },
  {
    path: 'trayectorias',
    loadChildren : () => import('./trayectorias/trayectorias.module').then(m => m.TrayectoriasModule),
  },

  {
    path: 'cimagenes',
    loadChildren : () => import('./cimagenes/cimagenes.module').then(m => m.CImagenesModule),
  },
  {path: '**', redirectTo: 'doc'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
