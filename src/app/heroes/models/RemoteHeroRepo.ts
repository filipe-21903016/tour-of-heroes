import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { BaseHeroRepo } from './BaseHeroRepo';
import { IHero } from '../../shared/models/IHero';
import { ISearchTerms } from '../../dashboard/components/advanced-hero-search/ISearchTerms';

@Injectable()
export class RemoteHeroRepo extends BaseHeroRepo {
  private heroesUrl = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    super();
  }

  create(data: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, data, this.httpOptions);
  }

  update(id: number, data: IHero): Observable<any> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.put(url, data, this.httpOptions);
  }

  delete(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<IHero>(url, this.httpOptions);
  }

  all(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl);
  }

  find(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url);
  }

  searchHero(terms: ISearchTerms): Observable<IHero[]> {
    return this.http.post<IHero[]>(
      `${this.heroesUrl}/search`,
      terms,
      this.httpOptions
    );
  }
}
