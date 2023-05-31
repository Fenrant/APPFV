import { Component, OnInit } from '@angular/core';
import { Prueba } from '../dataupload/prueba';
import { Algoritmo } from './algoritmo';
import { AlgoritmoService } from './algoritmo.service';

@Component({
  selector: 'app-algoritmo',
  templateUrl: './algoritmo.component.html',
  styleUrls: ['./algoritmo.component.css']
})
export class AlgoritmoComponent implements OnInit {

  algoritmos: Algoritmo[] = [];

  constructor(
    private algoritmoService: AlgoritmoService
    ) { }

  ngOnInit() {
    const prueba = new Prueba();
    this.algoritmoService.listarAlgoritmos(prueba).pipe()
    .subscribe(algs => {
      this.algoritmos = this.algoritmos.concat(algs)
    });
  }

}
