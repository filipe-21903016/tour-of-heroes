import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { IHero } from '../models/IHero';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  
  private httpOptions = { headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ){}
  
  getHeroes(): Observable<IHero[]>{
    return this.http.get<IHero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<IHero[]>('getHeroes', []))
    )
  }

  getHero(id:number): Observable<IHero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError(`getHero id=${id}`, {} as IHero))
    );
  }

  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: IHero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    );
  }

  handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error}`);
      return of(result as T);
    }
  }

  deleteHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<IHero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<IHero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<IHero[]>('searchHeroes', []))
    );
  }
  
  private log(message:string){
    this.messageService.add(`HeroService: ${message}`);
  }

  // getHeroes(): Observable<IHero[]> {
  //   return of(HEROES).pipe(
  //     tap(_ => this.messageService.add('HeroService: fetched heroes'))
  //   );
  // }

  // getHero(id: number): Observable<IHero> {
  //   // For now, assume that a hero with the specified `id` always exists.
  //   // Error handling will be added in the next step of the tutorial.
  //   const hero = HEROES.find(h => h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }

}
