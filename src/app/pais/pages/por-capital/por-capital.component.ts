import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.scss']
})
export class PorCapitalComponent{

  termino = '';
  hayError = false;
  paises: Pais[] = [];
  hola ='hola';
  constructor(private paisService: PaisService) {
  }


  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarCapital(this.termino)
      .subscribe({
        next: (paises) => {console.log(paises);this.paises = paises},
        error:(error) => {console.error(error); this.hayError = true; this.paises = []},
        complete:() => console.info('complete')
      })
    this.termino = '';
  }

}
