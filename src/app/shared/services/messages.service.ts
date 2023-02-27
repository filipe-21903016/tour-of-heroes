import { Injectable } from '@angular/core';
import { map, merge, Observable, scan, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private addSubject = new Subject<string>();
  private clearSubject = new Subject<void>();
  
  private actions$: Observable<IMessageAction>;
  messages$: Observable<string[]>;

  constructor(){
    this.actions$ = merge(
      this.addSubject.pipe(map(message => ({type:'ADD',payload:message} as IMessageAction))),
      this.clearSubject.pipe(map(_=>({type:'CLEAR'} as IMessageAction)))
    );

    this.messages$ = this.actions$.pipe(
      scan((messages, action) =>
        (action.type === 'ADD') ? [...messages,action.payload??''] : [], [] as string[])
    )
  }

  add(message: string) {
    this.addSubject.next(message)
  }

  clear() {
    this.clearSubject.next();
  }
}

interface IMessageAction{
    type: 'ADD' | 'CLEAR',
    payload?:string
}