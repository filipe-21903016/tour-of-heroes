import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
import { BaseCountryRepo } from '../../heroes/models/BaseCountryRepo';
import { ICountry } from '../models/ICountry';
import { MessageService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(
    private coutryRepo: BaseCountryRepo,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  getCountries(): Observable<ICountry[]> {
    return combineLatest([
      this.coutryRepo.all(),
      this.translate.get('COUNTRY_SERVICE.FETCHED_COUNTRIES'),
    ]).pipe(
      tap(([_, message]) => this.log(message)),
      map(([countries]) => countries)
    );
  }

  getCountry(id: number): Observable<ICountry> {
    return combineLatest([
      this.coutryRepo.find(id),
      this.translate.get('COUNTRY_SERVICE.FETCHED_COUNTRY', { countryId: id }),
    ]).pipe(
      tap(([_, message]) => this.log(message)),
      map(([country]) => country)
      // catchError(this.handleError(`getCountry id=${id}`, {} as ICountry))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Country Service: ${message}`);
  }
}
