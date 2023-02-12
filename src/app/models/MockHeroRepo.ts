import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HEROES } from "../mock-heroes";
import { BaseHeroRepo } from "./BaseHeroRepo";
import { IHero } from "./IHero";

@Injectable()
export class MockHeroRepo extends BaseHeroRepo{
    heroes = HEROES;

    searchHero(term: string): Observable<IHero[]> {
        if (!term.trim()) {
            return of([]);
        }
        let heros = this.heroes.filter( hero =>
            hero.name.indexOf(term) > -1
        )
        return of(heros);
    }

    create(data: IHero): Observable<IHero> {
        const hero = {
            ...data,
            id: this.genId(this.heroes)
        }

        this.heroes = [
            ...this.heroes, 
            hero
        ]

        return of(hero);
    }

    update(id: number, data: IHero): Observable<any> {
        //remove element
        this.heroes = this.heroes.filter(hero => hero.id !== id);

        //add new element
        this.heroes = [...this.heroes, data]

        return of({} as IHero);
    }

    delete(id: number): Observable<IHero> {
        let hero = this.heroes.find(hero => hero.id === id);
        this.heroes = this.heroes.filter(hero => hero.id !== id);
        return hero ? of(hero) : of({} as IHero);
    }

    all(): Observable<IHero[]> {
        return of(this.heroes);
    }

    find(id: number): Observable<IHero> {
        let hero = this.heroes.find(hero => hero.id === id);
        return hero ? of(hero) : of({} as IHero)
    }

    genId(heroes: IHero[]): number {
        return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
    }
}