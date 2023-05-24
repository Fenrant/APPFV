import { Component, OnInit } from '@angular/core';
import { PruebaService } from './dataupload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Prueba } from './prueba';
import swal from 'sweetalert2'
import { ResponseFile } from './file';
import { RequestAlgoritmo } from './request_algoritmo';
import { AlgoritmoService } from '../algoritmo/algoritmo.service';
import { Modulo } from '../algoritmo/modulo';
import { Algoritmo } from '../algoritmo/algoritmo';
import { Ejemplo, Parametros } from '../algoritmo/parametros';
import { ThisReceiver } from '@angular/compiler';
import { Result } from './result';
import { SrvStream } from './stream';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  prueba : Prueba;
  request: RequestAlgoritmo;
  responseFile!: ResponseFile;
  file!: File;
  algoritmo!: Algoritmo;
  modulos: Modulo[] = [ ];
  private _algoritmoId: number = 0;
  descripcion : string = "";
  private _moduloId: number = 0;
  algoritmos: Algoritmo[] = [];
  resultados: Result[] = [];
  resultsEjecucion: Result[] = [];
  ejemplos: Ejemplo[] = [];
  ejemplo: Ejemplo = new Ejemplo();
  private _ejemploId: number = 0;
  stream : SrvStream = new SrvStream();
  
  status =   {'IDLE' : "INACTIVO" , 'STARTING' : 'INICIANDO', 'RUNNING': 'CORRIENDO'} 

  public get moduloId(): number {
    return this._moduloId;
  }
  public set moduloId(value: number) {
    this._moduloId = value;
    this.prueba.moduloId = this._moduloId;
    this.algoritmos.splice(0);
    if(this.prueba.id == 0){
      this.algoritmoService.listarAlgoritmos(this.prueba).pipe()
      .subscribe(algs => {
        this.algoritmos = this.algoritmos.concat(algs)
      });
    }

    console.log('Prueba:',this.prueba);
  }

  public get algoritmoId(): number {
    return this._algoritmoId;
  }

  public set algoritmoId(value: number) {
    this._algoritmoId = value;
    this.prueba.algoritmoId = value;
    const found = this.algoritmos.find((obj) => {
      return obj.id === value;
    });
    if (found)  {
      this.algoritmo = found;
      console.log('Algoritmo:', this.algoritmo);
      this.request.comando = found.comandoEjecucion;
      this.descripcion = found.descripcion;
      this.request.instanceId = found.idServicioAws;
    }

    if(this.prueba.id ==0){
      this.algoritmoService.listarEjemplos(this.prueba).pipe()
      .subscribe(ej => {
        //this.ejemplos = this.ejemplos.concat(ej)
          this.ejemplos = ej;
      } );
    }
    if(this.algoritmo && this.algoritmo.tipoAnalisis == 'ONLINE') {
      this.stream.accion = 'CHECKESTADO'
      this.algoritmoService.accionMediaLive(this.stream).pipe()
      .subscribe(ej => {
        this.stream.estado = ej.estado;
        console.log('Stream', this.stream);
      } 
      );

    }
  }

  public get ejemploId(): number {
    return this._ejemploId;
  }
  public set ejemploId(value: number) {
    this._ejemploId = value;
    if(this.prueba.id !=0 && this.ejemplos.length ==0){
      this.ejemplos.push(this.prueba.ejemplo);
    }
    const found = this.ejemplos.find((obj) => {
      return obj.id === value;
    });

    console.log('Ejemplo:', found);
    
    if (found)  {
      this.ejemplo = found;
      this.prueba.ejemploId = this._ejemploId;
      this.request.params = this.ejemplo.parametros;
    }
  }

  constructor(
    private dataService: PruebaService,
    private algoritmoService: AlgoritmoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { 
      this.prueba = new Prueba();
      this.request = new RequestAlgoritmo();
    }

  ngOnInit(): void {
    this.algoritmoService.getModulos().pipe()
    .subscribe(modulos => {
      this.modulos = modulos
      this.cargarPrueba();
    });
  }

  obtenerResultados(): void {
    let request = {
      "ID": 0,
      "prueba_id": this.prueba.id,
    }
    console.log(request);
    this.algoritmoService.obtenerLogs(request).pipe()
    .subscribe(results => {
      this.resultados = results
      const found = this.resultados.filter((obj) => {
        return obj.padre_id === null;
      });
      if(found){
        this.resultsEjecucion = found;
      }
    });
  }

  cargarPrueba(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
          this.dataService.getPrueba(id).subscribe((result) => {
          this.prueba = result as Prueba
          console.log('Carga Prueba',this.prueba)
          this.moduloId = this.prueba.moduloId;
          this.algoritmos.push(this.prueba.algoritmo)
          this.ejemplo = this.prueba.ejemplo;
          this.algoritmoId = this.prueba.algoritmoId;
          this.ejemploId = this.prueba.ejemploId;
          this.request.pruebaId = this.prueba.id;
          this.request.algoritmoId = this.algoritmoId;
          this.algoritmo =this.prueba.algoritmo;
          this.obtenerResultados();
        });
      }
    })
  }

  verResultsModulo(result: number): void {
    console.log('Modulo ID', this.moduloId)
    switch (this.moduloId) {
      case 1:
          this.router.navigate(['/trayectorias/prueba',result]);
          break;
      case 2:
          this.router.navigate(['/cimagenes/mostrar',result]);
          console.log('result ID', result)
          console.log('Navegacion');
        break;
      default:
          console.log("No hay navegacion!");
          break;
    }        
    
  }
  create(): void {
      console.log('Create Prueba', this.prueba);
      this.dataService.create(this.prueba).subscribe(
        prueba => {
          swal.fire('Prueba Algoritmo', `La prueba con el id : ${prueba.id} ha sido creada con éxito`, 'success');
          this.router.navigate(['/parametrizacion/dataupload/']);
  
        },
        err => {
          console.error('Codigo del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      ) 

  }

  update(): void {
    this.dataService.update(this.prueba)
      .subscribe(
        json => {
          this.router.navigate(['/parametrizacion/dataupload/']);
          swal.fire('Prueba Actualizada', `${json.message}: ${json.statusCode}`, 'success');
        },
        err => {
          console.error('Codigo del error desde el backend: ' + err.statusCode);
        }
      )
  }

  iniciarStreaming(): void {
    let stream2 = this.stream;
    stream2.accion = 'STARTCHANNEL'
    this.algoritmoService.accionMediaLive(stream2).pipe()
      .subscribe(ej => {
        this.stream.estado = ej.estado;
        swal.fire('CANAL DE TRASMISION ' + ej.estado
        ,'El canal de trasmision se encuentra '+ ej.estado
        , 'success');
        return;
      });
  }

  stopStreaming(): void {
    let stream2 = this.stream;
    stream2.accion = 'STOPCHANNEL'
    this.algoritmoService.accionMediaLive(stream2).pipe()
      .subscribe(ej => {
        this.stream.estado = ej.estado;
        swal.fire('CANAL DE TRASMISION ' + ej.estado
        ,'El canal de trasmision se encuentra '+ ej.estado
        , 'warning');
        return;
      });
  }
  ejecutarAlgoritmo(): void { 
    if(this.algoritmo.tipoAnalisis == 'ONLINE') {
      let param = new Parametros();
      param.valor = this.stream.urlTrasmision;
      param.nombre = this.stream.nombreServicio;
      param.descripcion = this.stream.nombreServicio;;
      param.tipoDato = 'String';

      let stream2 = this.stream;
      stream2.accion = 'CHECKESTADO'
      this.algoritmoService.accionMediaLive(stream2).pipe()
        .subscribe(ej => {
          this.stream.estado = ej.estado;

          if (this.stream.estado =='IDLE') {
            swal.fire('CANAL DE TRASMISION INACTIVO'
            ,'Debe iniciar el canal de trasmision por que se encuentra INACTIVO'
            , 'warning');
            return;
          }
          if (this.stream.estado =='STARTING') {
            swal.fire('CANAL DE TRASMISION SE ESTA INICIANDO'
            ,'Esperar hasta que el canal se encuentre habilitado.'
            , 'warning');
            return;
          }
          if (this.stream.estado =='STOPPING') {
            swal.fire('CANAL DE TRASMISION SE ESTA DETENIENDO'
            ,'Esperar hasta que el canal se detenga para que lo vuelva a Iniciar.'
            , 'warning');
            return;
          }
        //Ejecuto el algoritmo
          this.enviarEjecucion()
        });

    }
    if(this.algoritmo.tipoAnalisis !=='ONLINE') {
      this.enviarEjecucion()    
    }
  }

  enviarEjecucion() :void {
        //Ejecuto el algoritmo
        console.log('Reques Algoritmo',this.request);
        this.dataService.ejecutarAlgoritmo(this.request)
        .subscribe(
          json => {
            if(json.statusCode == 500) {
              swal.fire('Ejecucion Enviada ', `${json.message}: ${json.statusCode}`, 'error');
            }else {
              swal.fire('Ejecucion Enviada ', `${json.message}: ${json.statusCode}`, 'success');
            }
            this.router.navigate(['/parametrizacion/dataupload/form', this.prueba.id]);
            if(this.algoritmo.tipoAnalisis == 'ONLINE') {
              this.request.params.pop();
            }
            this.ngOnInit();
          },
          err => {
            console.error('Codigo del error desde el backend: ' + err.statusCode);
            if(this.algoritmo.tipoAnalisis == 'ONLINE') {
              this.request.params.pop();
            }          }
        )
  }

  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  //upload() {
  //  if (this.file) {
  //    this.dataService.uploadfile(this.file).subscribe(
  //      respfile => {
  //        //this.router.navigate(['/parametrizacion/dataupload/']);
  //        console.log(respfile);
  //        this.responseFile = respfile;
  //        //swal.fire('Prueba Algoritmo', `La prueba con el id : ${resp.IDParam} ha sido creada con éxito`, 'success');
  //      },
  //      err => {
  //        console.error('Codigo del error desde el backend: ' + err.status);
  //        console.error(err.error.errors);
  //      }
  //    )
  //  } else {
  //    alert("Please select a file first")
  //  }
  //}
}
