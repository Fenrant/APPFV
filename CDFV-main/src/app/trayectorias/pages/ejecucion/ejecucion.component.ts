import { Component, OnInit } from '@angular/core';
import { EjecucionService } from '../ejecucion.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AlgoritmoService } from 'src/app/parametrizacion/pages/algoritmo/algoritmo.service';
import { Result } from 'src/app/parametrizacion/pages/dataupload/result';






@Component({
  selector: 'app-ejecucion',
  templateUrl: './ejecucion.component.html',
  styleUrls: ['./ejecucion.component.css']
})
export class EjecucionComponent implements OnInit {
  object: ObjectConstructor = Object;
  resultados: Result[] = [];

  id: number = 0;

  json = [""];
  keys = Object.keys(this.json[0]);
  values = Object.values(this.json);
  mapa : any;
  mapaSecure : any;
  mensaje : any;
  prueba_id: any;
  constructor(private dataService: EjecucionService,private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private algoritmoService: AlgoritmoService) { }
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      if (this.id) {
        this.obtenerResultados(this.id);
      }
    })
        
    this.route.paramMap.subscribe(params => {
      console.log(params);
    });
    
    
    this.dataService.getJson('https://filecdfv.s3.us-west-1.amazonaws.com/DatosJson_'+this.id + '.json').pipe().subscribe(response => {
      
      this.json = response;
      this.keys = Object.keys(this.json[0]);
      this.values = Object.values(this.json);
      console.log(this.values)
      
    });

    this.dataService.getMapa('https://filecdfv.s3.us-west-1.amazonaws.com/MapaPrueba_'+this.id).pipe().subscribe(response => {
      this.mapa = response;
      //this.mapaSecure = this._sanitizer.bypassSecurityTrustHtml(this.mapa);
      this.mapa = this.sanitizer.bypassSecurityTrustHtml(this.mapa);
      //console.log(this.mapa)
      
    });

    this.dataService.getMapa('https://filecdfv.s3.us-west-1.amazonaws.com/Mensaje_'+this.id+ '.txt').pipe().subscribe(response => {

      //console.log(response)

      
      //console.log(response)
      this.mensaje = response;
      this.mensaje = this.sanitizer.bypassSecurityTrustHtml(this.mensaje);
      
    });

    }

    obtenerResultados(detalle_id: number): void {
      let request = {
        "ID": detalle_id,
        "prueba_id": 0,
      }
      console.log(request);
      this.algoritmoService.obtenerLogs(request).pipe()
      .subscribe(results => {
        this.resultados = results
        console.log('Resultados',this.resultados)
      });
    }

}
