import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { switchMap, tap } from 'rxjs/operators';
import { Pais } from '../../interfaces/pais.interface';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.scss']
})
export class VerPaisComponent implements OnInit {

  pais!: Pais;
  badges: string[] = [];
  languages: string[] = [];
  currencies: string[] = [];
  public googleMapsUrl: SafeResourceUrl | undefined;
  constructor(private activatedRoute: ActivatedRoute,
              private paisService: PaisService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.paisService.getDetallePais(id) ),
        tap(console.log )
      )
      .subscribe(pais => {
          this.pais = pais[0];
          const {translations} = this.pais;
          const {languages} = this.pais;
          const { maps} = this.pais;
          const { currencies} = this.pais;
          const elementos = Object.values(translations);
          const lenguajes = Object.values(languages);
          const monedas = Object.values(currencies);

          this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(maps.googleMaps);
          for (let index = 0; index < elementos.length; index++) {
            this.badges.push(elementos[index].official);
          }

          for (let index = 0; index < lenguajes.length; index++) {
            this.languages.push(lenguajes[index]);
          }


          for (let index = 0; index < monedas.length; index++) {
            this.currencies.push(monedas[index].name);
          }
          console.log(this.currencies);
          
      });

      // EMPLEO SIN OPERADORES RXJS SWITCHMAP
      // .subscribe(({id}) => {
      //   console.log(id);     
      //   this.paisService.getDetallePais(id).subscribe(pais => {
      //     console.log(pais);
          
      //   })   
      // })      

  }

}
