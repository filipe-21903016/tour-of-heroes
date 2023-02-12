import { Observable } from "rxjs";
import { IRead } from "./IRead";
import { IWrite } from "./IWrite";

export abstract class BaseRepo<T> implements IWrite<T>, IRead<T>{
    abstract create(data: T): Observable<T>;
    abstract update(id: number, data: T): Observable<any>;
    abstract delete(id: number): Observable<T>;
    abstract all(): Observable<T[]>;
    abstract find(id: number): Observable<T>;    
}