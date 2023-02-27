import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, EMPTY, Observable, tap } from 'rxjs';
import { TeapotComponent } from '../components/teapot/teapot.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class TeapotInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 418) {
          this.dialog.open(TeapotComponent);
        }
        return EMPTY;
      })
    );
  }
}
