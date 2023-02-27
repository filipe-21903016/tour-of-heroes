import { Injectable } from '@angular/core';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { IHero } from '../models/IHero';
import { MessageService } from '../shared/services/messages.service';
import { BaseHeroRepo } from '../models/BaseHeroRepo';
import { ISearchTerms } from '../dashboard/components/advanced-hero-search/ISearchTerms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private heroRepo: BaseHeroRepo,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  getHeroes(): Observable<IHero[]> {
    return combineLatest([
      this.heroRepo.all(),
      this.translate.get('HERO_SERVICE.FETCHED_HEROES'),
    ]).pipe(
      tap(([heroes, message]) => {
        this.log(message);
      }),
      map(([heroes]) => heroes)
      // catchError(this.handleError<IHero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<IHero> {
    return combineLatest([
      this.heroRepo.find(id),
      this.translate.get('HERO_SERVICE.FETCHED_HERO', { heroId: id }),
    ]).pipe(
      tap(([hero, message]) => {
        this.log(message);
      }),
      map(([hero]) => hero)
      // catchError(this.handleError(`getHero id=${id}`, {} as IHero))
    );
  }

  updateHero(hero: IHero): Observable<any> {
    return combineLatest([
      this.heroRepo.update(hero.id, hero),
      this.translate.get('HERO_SERVICE.UPDATED_HERO', { heroId: hero.id }),
    ]).pipe(
      tap(([_, message]) => {
        this.log(message);
      })
      // catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.heroRepo.create(hero).pipe(
      switchMap((hero) =>
        combineLatest([
          of(hero),
          this.translate.get('HERO_SERVICE.CREATED_HERO', { heroId: hero.id }),
        ])
      ),
      tap(([hero, message]) => this.log(message)),
      map(([hero]) => hero)
      // catchError(this.handleError<IHero>('addHero'))
    );
  }

  searchHeroes(terms: ISearchTerms): Observable<IHero[]> {
    return this.heroRepo.searchHero(terms).pipe(
      switchMap((heroes) =>
        combineLatest([
          of(heroes),
          this.translate.get('HERO_SERVICE.HEROES_FOUND', {
            heroesLength: heroes.length,
            query: JSON.stringify(terms),
          }),
          this.translate.get('HERO_SERVICE.HEROES_NOT_FOUND', {
            query: JSON.stringify(terms),
          }),
        ])
      ),
      tap(([heroes, found_message, not_found_message]) => {
        console.log(JSON.stringify([heroes, found_message, not_found_message]));
        heroes.length ? this.log(found_message) : this.log(not_found_message);
      }),
      map(([heroes]) => heroes)
      // catchError(this.handleError<IHero[]>('searchHeroes', []))
    );
  }

  deleteHero(id: number): Observable<IHero> {
    return combineLatest([
      this.heroRepo.delete(id),
      this.translate.get('HERO_SERVICE.DELETED_HERO', { heroId: id }),
    ]).pipe(
      tap(([_, message]) => {
        this.log(message);
      }),
      map(([hero]) => hero)
      // catchError(this.handleError<IHero>('deleteHero'))
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
    this.messageService.add(`HeroService: ${message}`);
  }
}
