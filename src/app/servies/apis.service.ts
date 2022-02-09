import { Injectable } from '@angular/core';
import {HttpClient ,HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApisService {

  getApiUrl : string = "https://randomuser.me/api/?page=1&seed=feed";
  getUserApiUrl : string = "https://randomuser.me/api/?,";

  uId

  constructor(private httpCM : HttpClientModule,private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
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

  getuid(uid){
    console.log("uid in service",uid)
    this.uId = uid
  }

  getuser() {
    return this.http.get(this.getUserApiUrl+`inc=id=${this.uId}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
