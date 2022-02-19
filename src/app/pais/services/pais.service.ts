import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private API_URL = 'https://restcountries.com/v3.1';

  get httpParams() {
    return  new HttpParams().set('fields','name,capital,flags,population,cca2')
  }
  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Pais[]> {
    const url = `${this.API_URL}/name/${termino}`;
    return this.http.get<Pais[]>(url,{params: this.httpParams});
      // .pipe(
      //   catchError(err => of([]))
      // );
  }


  buscarCapital(termino: string): Observable<Pais[]> {
    const url = `${this.API_URL}/capital/${termino}`;
    return this.http.get<Pais[]>(url, {params:this.httpParams});
  }


  getPaisPorRegion(termino: string): Observable<Pais[]> {
  
    const url = `${this.API_URL}/region/${termino}`;
    return this.http.get<Pais[]>(url,{params: this.httpParams})
        .pipe(
          tap(console.log)
        )
  }


  getDetallePais(termino: string): Observable<Pais> {
    const url = `${this.API_URL}/alpha/${termino}`;
    return this.http.get<Pais>(url);
  }
}
