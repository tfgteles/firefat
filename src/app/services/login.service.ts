import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {LoginCredential, UserRegistration} from '../models/auth-dtos';
import { BASE_URL, LOGIN_PATH, REGISTER_PATH } from './constants';
import { AuthResult } from '../models/auth-dtos';
import { Router } from '@angular/router';
import { GameDataService } from './game-data.service';
import { GameRestService } from './game-rest.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private gameData: GameDataService, private gameRestService: GameRestService) {}

  public async loginUser(credentials: LoginCredential): Promise<AuthResult> {
    const url = BASE_URL + LOGIN_PATH;
    let authResult: AuthResult;
    localStorage.removeItem('id_token');
    try {
      authResult = await this.http.post<AuthResult>(url, credentials).toPromise();
      console.log(authResult);
      localStorage.setItem('id_token', authResult.token);
      this.gameData.currentUserEmail = credentials.email;
    } catch(err) {
      console.log(err.error);
      console.log(err.error.errors[0]);
      authResult = {...err.error};
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
    this.gameRestService.startLoading();
    const url = BASE_URL + REGISTER_PATH;
    let authResult: AuthResult;
    localStorage.removeItem('id_token');
    try {
      authResult = await this.http.post<AuthResult>(url, userRegistration).toPromise();
      this.gameRestService.closeLoading();
      localStorage.setItem('id_token', authResult.token);
      this.router.navigate(['/main/home/user-profile']);
    } catch(err) {
      this.gameRestService.closeLoading();
      console.log(err);
      authResult = {token: null, success: false, errors: ['Something went wrong. Please, try again.']};
    }
    return authResult;
  }


}
