import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {LoginCredential} from '../models/login-credential.model';
import { BASE_URL, LOGIN_PATH } from './constants';
import { AuthResult } from '../models/auth-result';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  public async loginUser(credentials: LoginCredential): Promise<AuthResult> {
    const url = BASE_URL + LOGIN_PATH;
    let authResult: AuthResult;
    this.logout();
    try {
      authResult = await this.http.post<AuthResult>(url, credentials).toPromise();
      console.log(authResult);
      localStorage.setItem('id_token', authResult.token);
    } catch(err) {
      console.log(err);
      authResult = {token: null, success: false, errors: []};
    }
    return authResult;
  }

  login(credentials: LoginCredential): Observable<AuthResult> {
    const url = BASE_URL + LOGIN_PATH;
    return this.http.post<AuthResult>(url, credentials).pipe(
      // retry(3), // retry a failed request up to 3 times
      // catchError(this.handleError)
    );
  }

  public logout(): void {
    localStorage.removeItem('id_token');
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem('id_token')) {
      return true;
    } else {
      return false;
    }
  }

  /* private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  } */

}
