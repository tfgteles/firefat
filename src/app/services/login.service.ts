import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {LoginCredential, UserRegistration} from '../models/auth-dtos';
import { BASE_URL, LOGIN_PATH, REGISTER_PATH } from './constants';
import { AuthResult } from '../models/auth-dtos';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) {}

  public async loginUser(credentials: LoginCredential): Promise<AuthResult> {
    const url = BASE_URL + LOGIN_PATH;
    let authResult: AuthResult;
    localStorage.removeItem('id_token');
    try {
      authResult = await this.http.post<AuthResult>(url, credentials).toPromise();
      console.log(authResult);
      localStorage.setItem('id_token', authResult.token);
      this.router.navigate(['/main']);
    } catch(err) {
      console.log(err);
      authResult = {token: null, success: false, errors: ['Something went wrong. Please, try again.']};
    }
    return authResult;
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    if (localStorage.getItem('id_token')) {
      return true;
    } else {
      return false;
    }
  }

  public async registerUser(userRegistration: UserRegistration): Promise<AuthResult> {
    const url = BASE_URL + REGISTER_PATH;
    let authResult: AuthResult;
    localStorage.removeItem('id_token');
    try {
      authResult = await this.http.post<AuthResult>(url, userRegistration).toPromise();
      localStorage.setItem('id_token', authResult.token);
      this.router.navigate(['/main/home/user-profile']);
    } catch(err) {
      console.log(err);
      authResult = {token: null, success: false, errors: ['Something went wrong. Please, try again.']};
    }
    return authResult;
  }


}
