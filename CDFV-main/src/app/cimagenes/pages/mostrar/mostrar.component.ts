import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MostrarService } from '../mostrar.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AlgoritmoService } from 'src/app/parametrizacion/pages/algoritmo/algoritmo.service';
import { Result } from 'src/app/parametrizacion/pages/dataupload/result';


@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  id: number = 0;
  json = [""]
  //images = ["https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles.jpg" , "https://educacion30.b-cdn.net/wp-content/uploads/2019/02/girasoles.jpg"]
  images : string[]= [];
  resultados: Result[] = [];

  
  constructor(private route: ActivatedRoute,
    private dataService: MostrarService,
    private _config:NgbCarouselConfig,
    private algoritmoService: AlgoritmoService) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.id = Number(params['id']);
      console.log('ID',this.id);
      if (this.id) {
        this.obtenerResultados(this.id);
      }
    })
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
      for (let index = 0; index < this.resultados.length; index++) {
        this.images = this.resultados[index].output  ;
      }
      console.log('Images',this.images)
    });
  }
  
  

}
