import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements OnInit {

  @Input() sideNavStatus: boolean = false;

  list = [
    {
      number: '1',
      name: 'Algoritmos',
      icon: 'fa-solid fa-microchip',
      path: '/parametrizacion/algoritmo',
    },
    {
      number: '2',
      name: 'Pruebas',
      icon: 'fa-solid fa-server',
      path: '/parametrizacion/dataupload',
    },
    {
      number: '3',
      name: 'Trayectorias',
      icon: 'fa-solid fa-road',
      path: '/trayectorias',
    },
    {
      number: '4',
      name: 'Imagenes y Video',
      icon: 'fa-solid fa-video',
      path: '/cimagenes',
    },
    {
      number: '5',
      name: 'Arquitectura',
      icon: 'fa-solid fa-sitemap',
      path: '/doc',
    },
    //{
    //  number: '6',
    //  name: 'Administracion',
    //  icon: 'fa-solid fa-screwdriver-wrench',
    //  path: '/',
    //}
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
