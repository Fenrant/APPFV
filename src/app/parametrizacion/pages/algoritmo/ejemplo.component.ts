import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaService } from '../dataupload/dataupload.service';
import { ResponseFile } from '../dataupload/file';
import { AlgoritmoService } from './algoritmo.service';
import { Ejemplo, Parametros } from './parametros';
import swal from 'sweetalert2'
import { Prueba } from '../dataupload/prueba';

@Component({
  selector: 'app-ejemplo',
  templateUrl: './ejemplo.component.html',
  styleUrls: ['./ejemplo.component.css']
})
export class EjemploComponent implements OnInit {

  ejemplo: Ejemplo = new Ejemplo();
  responseFile!: ResponseFile;
  files: File[] = [];
  renderImages: any = [];
  ejemplos: Ejemplo[] = [];


  algoritmoId: number = 0;

  listCantParams: number[] =  [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
  ];

  tipoDeDatos: string[] =  [
    "Archivo",
    "String",
    "Integer",
    "Double"
  ];

  //private _valuesTipoDatos: string[] = [];
  //public get valuesTipoDatos(): string[] {
  //  return this._valuesTipoDatos;
  //}
  //public set valuesTipoDatos(value: string[]) {
  //  this._valuesTipoDatos = value;
  //}

  //public set tipoDato(value: string) {
  //  var index = value.split('-')[1] ;
  //  console.log(index);
  //  this.valuesTipoDatos.splice(parseInt(index),parseInt(index)+1,value);
  //  console.log(this.valuesTipoDatos);
  //}

  listParams: Parametros[] = [];

  private _cantParams: number = 0;

  public get cantParams(): number {
    return this._cantParams;
  }

  public set cantParams(value: number) {
    this._cantParams = value;
    this.ejemplo.cantParametros = value;
    if (this.listParams.length > 0 ){
      this.listParams.splice(0);
    }
    for (let index = 0; index < value; index++) {
      let param = new Parametros();
      param.orden = index + 1;
      this.listParams.push(param);
    }
    this.ejemplo.parametros = this.listParams;
  }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dataService: PruebaService,
              private algoritmoService: AlgoritmoService) { }

  ngOnInit(): void {
    this.obtenerAlgoritmoId();
    this.ejemplo.algoritmoId = Number(this.algoritmoId);   
    this.cargarEjemplo();
  }

  public cargarEjemplo( ) {
    this.activatedRoute.params.subscribe(params => {
      let algid = Number(params['algid']);
      let id = Number(params['id']);
      console.log(algid, id);
      if (algid && id) {
        const prueba = new Prueba();
        prueba.algoritmoId = algid;
        this.algoritmoService.listarEjemplos(prueba).pipe()
        .subscribe(ej => {
            this.ejemplos = ej;
            const found = this.ejemplos.find((obj) => {
              return obj.id === id;
            });
        
            console.log('Ejemplo:', found);

            if (found)  {
              this.ejemplo = found;
              let params = this.ejemplo.parametros;
              this.cantParams = this.ejemplo.cantParametros;
              this.listParams = params;
            }
        } );
      }
    })


  }

  crearEjemplo() {

    this.algoritmoService.crearEjemplo(this.ejemplo).subscribe(
      eje => {
        console.log(eje);
        swal.fire('Ejemplo de Algoritmo', `el ejemplo con el id : ${eje.id} ha sido creada con éxito`, 'success');
        this.router.navigate(['/parametrizacion/algoritmo/form/',eje.algoritmoId]);

      },
      err => {
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    ) 
  }


  obtenerAlgoritmoId(): void {
    this.activatedRoute.params.subscribe(params => {
      this.algoritmoId = params['algid'];
    })
  }

  async upload() {
    console.log('Ejemplo',this.ejemplo)
    if (this.listParams.length > 0) {
      for (let i = 0; i < this.listParams.length; i++) {
        if(this.listParams[i].tipoDato == 'Archivo') {
            try {
              console.log('Parametro',this.listParams[i]);
              let filePath = Math.random() * 10000000000000000 + '_' + this.listParams[i].valor.name; 
              
              let respfile = await this.dataService.uploadFile2(this.listParams[i].valor, filePath);
              
              this.responseFile = respfile as ResponseFile;
              console.log('Response File',this.responseFile);
              this.listParams[i].valor = this.responseFile.Key;

              console.log(this.listParams[i].valor,' - ',this.responseFile.Key)

            } catch (error) {
              console.error('Error al cargar el archivo');
              console.error(error);            
            }
        }
      }    
      this.algoritmoService.crearEjemplo(this.ejemplo).subscribe(
        eje => {
          console.log(eje);
          swal.fire('Ejemplo de Algoritmo', `el ejemplo con el id : ${eje.id} ha sido creada con éxito`, 'success');
          this.router.navigate(['/parametrizacion/algoritmo/form/',eje.algoritmoId]);
  
        },
        err => {
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      ) 
    } else {
      alert("Debe de agregar un parametro")
    }
  }

  async onImageUpdate() {
    console.log(this.files);
    if (this.files.length < 1) {
      swal.fire('Please Select Drop your Image first','error');
      return;
    }

    for (let i = 0; i < this.files.length; i += 1) {
      let file = this.files[i];

      let filePath =
        'images/' + Math.random() * 10000000000000000 + '_' + file.name; // to create unique name for avoiding being replaced
      try {
        //let response = await this.dataService.uploadFile2(file, filePath);
        let response;
        console.log(response);

        swal.fire(file.name + 'uploaded Successfully :)','success');
        const url = (response as any).Location;
        this.renderImages.push(url);
      } catch (error) {
        swal.fire('Something went wrong! ','error');
      }
    }
    this.files = [];
  }

  onFilechange(event: any, index: number) {
    console.log(index,event.target.files[0])
    this.listParams[index].valor = event.target.files[0] as File
  }
}
