import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.scss']
})
export class PorPaisComponent {
  termino = '';
  hayError = false;
  paises: Pais[] = [];
  paisesSugeridos: Pais[] = [];
  mostrarSugerencias = false;
  constructor(private paisService: PaisService) {
  }


  buscar(termino: string) {
    this.hayError = false;
    this.mostrarSugerencias = false;
    this.termino = termino;
    this.paisService.buscarPais(this.termino)
      .subscribe({
        next: (paises) => {console.log(paises);this.paises = paises},
        error:(error) => {console.error(error); this.hayError = true; this.paises = []},
        //complete:() => console.info('complete')
      })
    this.termino = '';
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.mostrarSugerencias = true;
    this.termino = termino;
    this.paisService.buscarPais(termino)
    .subscribe({
      next: (paises) => this.paisesSugeridos = paises.splice(0,4),
      error:(error) => {console.error(error); this.hayError = true; this.paisesSugeridos = []},
      complete:() => console.info('complete')
    })
  }

}
