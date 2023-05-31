import { Component, OnInit } from '@angular/core';
import { Algoritmo } from './algoritmo';
import { AlgoritmoService } from './algoritmo.service';
import { Modulo } from './modulo';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { Ejemplo } from './parametros';
import { Prueba } from '../dataupload/prueba';

@Component({
  selector: 'app-formalg',
  templateUrl: './formalg.component.html',
  styleUrls: ['./formalg.component.css']
})
export class FormalgComponent implements OnInit {

  algoritmo: Algoritmo;
  ejemplos: Ejemplo[] = [];

  modulos: Modulo[] = [ ];
  modulo!: number;
  services: string[] =  [
    "AWS EC2",
    "---"
  ];

  tiposDeAnalisis: string[] =  [
    "OFFLINE",
    "ONLINE"
  ];


  constructor(private algoritmoService: AlgoritmoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.algoritmo = new Algoritmo();

   }

  ngOnInit(): void {
    this.algoritmoService.getModulos().pipe()
    .subscribe(modulos => this.modulos = modulos);
    this.cargarAlgoritmo();
    this.cargarEjemplo();


  }

  cargarAlgoritmo(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.algoritmoService.getAlgoritmo(id).subscribe((algoritmo) => {
          console.log(algoritmo);
          this.algoritmo = algoritmo as Algoritmo
        });
      }
    })
  }

  cargarEjemplo(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        const prueba = new Prueba();
        prueba.algoritmoId = id;
        this.algoritmoService.listarEjemplos(prueba).pipe()
        .subscribe(ej => {
            this.ejemplos = ej;
        } );
      }
    })
  }

  create(): void {
      console.log('Algoritmo', this.algoritmo);
      this.algoritmoService.create(this.algoritmo).subscribe(
        algoritmo => {
          swal.fire('Algoritmo', `El algoritmo con el id : ${algoritmo.id} ha sido creada con éxito`, 'success');
          this.router.navigate(['/parametrizacion/algoritmo/form', algoritmo.id]);
        },
        err => {
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error);
        }
      ) 
  }
  update(): void {}
  
}
