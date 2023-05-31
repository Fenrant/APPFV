import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable,of ,throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EjecucionService {

 
  
  constructor(private http: HttpClient) { }
  
    //[innerHTML]="codigoHTML"
    // Método para obtener una lista de usuarios
    getJson(url: any): Observable<any> {
        return this.http.get(url);
    }
    getMapa(url: any): Observable<any> {
      return this.http.get(url,{responseType: 'text'});
  }
}
