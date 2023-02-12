import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { BaseHeroRepo } from "./BaseHeroRepo";
import { BaseRepo } from "./BaseRepo";
import { IHero } from "./IHero";

@Injectable()
export class RemoteHeroRepo extends BaseHeroRepo{
    private heroesUrl = 'api/heroes';  
    private httpOptions = { headers: new HttpHeaders({'Content-Type':'application/json'})}
    
    constructor(private http:HttpClient){
        super();
    }

    create(data: IHero): Observable<IHero> {
        return this.http.post<IHero>(this.heroesUrl, data, this.httpOptions);
    }

    update(id: number, data: IHero): Observable<any> {
        return this.http.put(this.heroesUrl, data, this.httpOptions);
    }
    
    delete(id: number): Observable<IHero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete<IHero>(url, this.httpOptions)
    }

    all(): Observable<IHero[]> {
        return this.http.get<IHero[]>(this.heroesUrl)
    }

    find(id: number): Observable<IHero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get<IHero>(url).pipe();
    }
    
    searchHero(term: string): Observable<IHero[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${term}`)
    }
}