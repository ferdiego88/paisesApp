import { Component } from '@angular/core';
import { Pais } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.scss']
})
export class PorRegionComponent  {
  regiones = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva = '';
  termino = '';
  hayError = false;
  paises: Pais[] = [];
  constructor(private paisService: PaisService) {
  }


  activarRegion(region: string) {
    this.regionActiva = region;
    this.buscar(region);
    // TODO: Hacer el llamado al servicio
  }

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paisService.getPaisPorRegion(this.termino)
      .subscribe({
        next: (paises) => {console.log(paises);this.paises = paises},
        error:(error) => {console.error(error); this.hayError = true; this.paises = []},
        //complete:() => console.info('complete')
      })
    this.termino = '';
  }

  getRegionCSS(region: string ) {
    return (region === this.regionActiva ? 'btn btn-primary': 'btn btn-outline-primary');
  }
}
