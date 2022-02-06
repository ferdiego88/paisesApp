import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Pais } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private API_URL = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Pais[]> {
    const url = `${this.API_URL}/name/${termino}`;
    return this.http.get<Pais[]>(url);
      // .pipe(
      //   catchError(err => of([]))
      // );
  }


  buscarCapital(termino: string): Observable<Pais[]> {
    const url = `${this.API_URL}/capital/${termino}`;
    return this.http.get<Pais[]>(url);
      // .pipe(
      //   catchError(err => of([]))
      // );
  }
}
