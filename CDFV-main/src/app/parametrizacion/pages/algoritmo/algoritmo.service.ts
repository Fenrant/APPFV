import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable,of ,throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { Modulo } from './modulo';
import { Algoritmo } from './algoritmo';
import { Ejemplo } from './parametros';
import { Prueba } from '../dataupload/prueba';
import { Result } from '../dataupload/result';
import { Respuesta } from '../dataupload/response';
import { SrvStream } from '../dataupload/stream';

@Injectable({
    providedIn: 'root'
  })
export class AlgoritmoService {
    private urlEndPoint: string = 'https://aocb4e3yx3.execute-api.us-west-1.amazonaws.com/develop/parametrizacion';
    private urlEndPoint2: string = 'https://aocb4e3yx3.execute-api.us-west-1.amazonaws.com/develop/algoritmo';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    private httpHeaders2 = new HttpHeaders({"Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET, PUT, PATCH, POST, DELETE, OPTIONS",
                "Access-Control-Allow-Headers" : "Authorization, Content-Type"});

    constructor(private http: HttpClient, private router: Router) { }

    getModulos(): Observable<Modulo[]> {
        return this.http.get(`${this.urlEndPoint}/modulos`).pipe(
          map(response => {
            let modulos = response as Modulo[];
            return modulos;
          }
          )
        );
      }

          
    create(algoritmo: Algoritmo): Observable<Algoritmo> {
      return this.http.post(`${this.urlEndPoint2}`, algoritmo, { headers: this.httpHeaders }).pipe(
        map((response: any) => response.algoritmo as Algoritmo),
        catchError(e => {
  
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    getAlgoritmo(id: number): Observable<Algoritmo> {

      return this.http.get<Algoritmo>(`${this.urlEndPoint2}/${id}`).pipe(
        catchError(e => {
          console.error(e);
          swal.fire('Error ', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }

    crearEjemplo(ejemplo: Ejemplo): Observable<Ejemplo> {
      console.log('Ejemplo service',ejemplo);
      return this.http.post(`${this.urlEndPoint2}/ejemplo`, ejemplo, { headers: this.httpHeaders }).pipe(
        map((response: any) => response.ejemplo as Ejemplo ),
        catchError(e => {
          console.log('Error',e);
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }
    accionMediaLive(stream: SrvStream): Observable<SrvStream> {
      return this.http.post(`${this.urlEndPoint}/medialive`, stream, { headers: this.httpHeaders }).pipe(
        map((response: any) => response as SrvStream ),
        catchError(e => {
          console.log('Error',e);
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }
    listarAlgoritmos(prueba: Prueba): Observable<Algoritmo[]> {
      return this.http.post(`${this.urlEndPoint2}/listaralgoritmos`,prueba,{ headers: this.httpHeaders }).pipe(
        map(response => {
          let respuesta = response as Respuesta;
          let algoritmos:Algoritmo[] = [];

          if(respuesta.statusCode === 400){
            return algoritmos;
          }

          algoritmos = response as Algoritmo[];
          return algoritmos.map(prueba => {
            return prueba;
          });
        }
        )
      );
    }


    obtenerLogs(request : any): Observable<Result[]> {
      return this.http.post(`${this.urlEndPoint}/results`,request,{ headers: this.httpHeaders }).pipe(
        map(response => {
          
          let respuesta = response as Respuesta;
          let results:Result[] = [];

          if(respuesta.statusCode === 400){
            return results;
          }

          results = response as Result[];
          return results.map(result => {
            return result;
          });
        }
        )
      );
    }

    listarEjemplos(prueba: Prueba): Observable<Ejemplo[]> {
      return this.http.post(`${this.urlEndPoint2}/listarejemplos`,prueba,{ headers: this.httpHeaders }).pipe(
        map(response => {
          let respuesta = response as Respuesta;
          let ejemplos:Ejemplo[] = [];

          if(respuesta.statusCode === 400){
            return ejemplos;
          }

          ejemplos = response as Ejemplo[];

          return ejemplos.map(ej => {
            return ej;
          });
        }
        )
      );
    }
}