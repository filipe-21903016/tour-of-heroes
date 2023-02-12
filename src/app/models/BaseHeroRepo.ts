import { Observable } from "rxjs";
import { BaseRepo } from "./BaseRepo";
import { IHero } from "./IHero";

export abstract class BaseHeroRepo extends BaseRepo<IHero>{
    abstract searchHero(term:string): Observable<IHero[]>;
}