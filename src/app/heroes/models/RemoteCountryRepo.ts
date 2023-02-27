import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCountryRepo } from './BaseCountryRepo';
import { ICountry } from '../../shared/models/ICountry';

@Injectable()
export class RemoteCountryRepo extends BaseCountryRepo {
  private countriesUrl = 'api/countries';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  create(data: ICountry): Observable<ICountry> {
    throw new Error('Method not implemented.');
  }
  update(id: number, data: ICountry): Observable<any> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<ICountry> {
    throw new Error('Method not implemented.');
  }
  all(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(this.countriesUrl);
  }
  find(id: number): Observable<ICountry> {
    const url = `${this.countriesUrl}/${id}`;
    return this.http.get<ICountry>(url);
  }
}
