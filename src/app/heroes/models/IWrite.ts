import { Observable } from "rxjs";

export interface IWrite<T>{
    create(data: T): Observable<T>;
    update(id:number, data:T): Observable<any>
    delete(id:number):Observable<T>;
}