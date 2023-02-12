import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { IHero } from '../models/IHero';
import { MessageService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseRepo } from '../models/BaseRepo';
import { BaseHeroRepo } from '../models/BaseHeroRepo';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  
  private httpOptions = { headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(
    private heroRepo: BaseHeroRepo,
    private messageService: MessageService
  ){}
  
  getHeroes(): Observable<IHero[]>{
    return this.heroRepo.all().pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<IHero[]>('getHeroes', []))
    );
  }

  getHero(id:number): Observable<IHero>{
    return this.heroRepo.find(id).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError(`getHero id=${id}`, {} as IHero))
    )
  }

  updateHero(hero: IHero): Observable<any> {
    return this.heroRepo.update(hero.id, hero).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.heroRepo.create(hero).pipe(
      tap(hero => this.log(`created hero id = ${hero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    )
  }

  handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error}`);
      return of(result as T);
    }
  }

  deleteHero(id: number): Observable<IHero> {
    return this.heroRepo.delete(id).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    );
  }

  searchHeroes(term: string): Observable<IHero[]> {
    return this.heroRepo.searchHero(term).pipe(
        tap(x => x.length ?
            this.log(`found heroes matching "${term}"`) :
            this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<IHero[]>('searchHeroes', []))
    )
  }
  
  private log(message:string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
