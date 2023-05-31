import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable,of ,throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MostrarService {

  constructor(private http: HttpClient) { }
  
    
    getJsonInagenes(url: any): Observable<any> {
      return this.http.get(url,{responseType: 'text'});
  }
}
