import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Prueba } from './prueba';
import { Observable,of ,throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { ResponseFile } from './file';
import { RequestAlgoritmo } from './request_algoritmo';
import { lastValueFrom ,firstValueFrom} from 'rxjs'
import { Algoritmo } from '../algoritmo/algoritmo';
import * as S3 from 'aws-sdk/clients/s3';
import { Respuesta } from './response';

@Injectable({
    providedIn: 'root'
  })
export class PruebaService {
    private urlEndPoint: string = 'https://64p6c5f18a.execute-api.us-east-1.amazonaws.com/desarrollo/parametrizacion';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    private httpHeaders2 = new HttpHeaders({"Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Methods" : "GET, PUT, PATCH, POST, DELETE, OPTIONS",
                "Access-Control-Allow-Headers" : "Authorization, Content-Type"});

    constructor(private http: HttpClient, private router: Router) { }

    
    create(prueba: Prueba): Observable<Prueba> {
        return this.http.post(`${this.urlEndPoint}/cabpruebas`, prueba, { headers: this.httpHeaders }).pipe(
          map((response: any) => response.prueba as Prueba),
          catchError(e => {
    
            if (e.status == 400) {
              return throwError(e);
            }
    
            //console.error(e.error.mensaje);
            swal.fire(e.error.mensaje, e.error.error, 'error');
            return throwError(e);
          })
        );
      }

    public uploadfile(file: File)  {
      let fileName =  file.name;
      let headerFile = new HttpHeaders({ 'file-name': fileName });
      let formParams = new FormData();
      formParams.append('file', file);
    
      return this.http.post('https://hdiyo30kji.execute-api.us-west-1.amazonaws.com/uploadfile'
      , formParams
      ,{ headers: headerFile }).pipe(
        map((response: any) => response as ResponseFile),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          //console.error(e);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      ).toPromise();
    }

    async uploadFile2(file: any, filePath: any) {
      //const filePath = file.name;
      return new Promise((resolve, reject) => {
        const contentType = file.type;
        const bucket = new S3({
          accessKeyId: 'AKIAYKBY6FE3B3YB47G2',// ACCESS_KEY_ID
          secretAccessKey: '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',// SECRET_ACCESS_KEY
          region: 'us-east-1',// BUCKET_REGION
        });
        const params = {
          Bucket: 'filecdfv3',//BUCKET_NAME
          Key: filePath,
          Body: file,
          ACL: 'public-read',
          ContentType: contentType,
        };
        bucket.upload(params, function (err: any, data: any) {
          if (err) {
            reject(err);
          }
          resolve(data);
        });

 
      }
      );
    }


    getPruebas(): Observable<Prueba[]> {
      return this.http.get(`${this.urlEndPoint}/pruebas`).pipe(
        map(response => {
          let respuesta = response as Respuesta;
          let pruebas:Prueba[] = [];
          
          if(respuesta.statusCode === 400){
            return pruebas;
          }
          pruebas = response as Prueba[];
          console.log(pruebas)
          return pruebas.map(prueba => {
            prueba.observacion = prueba.observacion.toUpperCase();
            return prueba;
          });
        }
        )
      );
    }


    getPrueba(id: number): Observable<Prueba> {

      return this.http.get<Prueba>(`${this.urlEndPoint}/cabpruebas/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/parametrizacion/dataupload/']);
          //console.log(e.message);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(e);
        })
      );
    }

    update(prueba: Prueba): Observable<any> {
      return this.http.post<any>(`${this.urlEndPoint}/cabpruebas/${prueba.id}`, prueba, { headers: this.httpHeaders }).pipe(
        catchError(e => {
  
          if (e.status == 400) {
            return throwError(e);
          }
  
          //console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    ejecutarAlgoritmo(request: RequestAlgoritmo): Observable<any> {
      return this.http.post<any>(`${this.urlEndPoint}/algoritmo`, request, { headers: this.httpHeaders }).pipe(
        catchError(e => {
  
          if (e.status == 400) {
            return throwError(e);
          }
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(e);
        })
      );
    }

    delete(prueba: Prueba): Observable<Prueba> {
      return this.http.put<Prueba>(`${this.urlEndPoint}/cabpruebas/${prueba.id}`, prueba,{ headers: this.httpHeaders }).pipe(
        catchError(e => {
          //console.error(e.error.mensaje);
          swal.fire(e.mensaje, e.statusCode, 'error');
          return throwError(e);
        })
      );
    }
}