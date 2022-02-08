import { Injectable } from '@angular/core';
import {HttpClient ,HttpClientModule,HttpResponse,  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  // getApiUrl : string = "https://jsonplaceholder.typicode.com/posts";
  getApiUrl : string = "https://randomuser.me/api/?page=1&seed=feed";

  constructor(private httpCM : HttpClientModule,private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getPosts(postNo) {
    return this.http.get(this.getApiUrl+`&results=${postNo}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
