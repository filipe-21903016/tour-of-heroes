import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    }),
    reportProgress: true,
  };
  url = 'api/documents';

  constructor(private http: HttpClient) {}

  uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('File', file);

    return this.http
      .post(this.url, formData)
      .pipe(tap((_) => console.log('Uploading image')));
  }
}
