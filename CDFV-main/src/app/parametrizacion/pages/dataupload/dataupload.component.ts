import { Component, OnInit } from '@angular/core';
import { PruebaService } from './dataupload.service';
import { Prueba } from './prueba';
import { tap } from 'rxjs/operators';
import swal from 'sweetalert2'


@Component({
  selector: 'app-dataupload',
  templateUrl: './dataupload.component.html',
  styleUrls: ['./dataupload.component.css']
})
export class DatauploadComponent implements OnInit {

  pruebas: Prueba[] = [];

  constructor(private dataService: PruebaService) { }

  ngOnInit() {
    this.dataService.getPruebas().pipe(

    ).subscribe(pruebas => this.pruebas = pruebas);
  }

  delete(prueba: Prueba): void {

    swal.fire({
      title: 'Esta seguro?',
      text: `Seguro que desea anular la prueba ${prueba.id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Anular'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.delete(prueba).subscribe(
          () => {
            //this.pruebas = this.pruebas.map(test => )
            swal.fire(
              'Prueba Anulada!',
              `Prueba ${prueba.id} anulada con exito.`,
              'success'
            )
          }
        )
      }
      
    })
  }
}
