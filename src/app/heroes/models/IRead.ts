import {Observable} from 'rxjs';

export interface IRead<T>{
    all(): Observable<T[]>;
    find(id: number):Observable<T>;
}