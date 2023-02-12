import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { IHero } from '../models/IHero';
import { MessageService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<IHero[]> {
    return of(HEROES).pipe(
      tap(_ => this.messageService.add('HeroService: fetched heroes'))
    );
  }

  getHero(id: number): Observable<IHero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}
