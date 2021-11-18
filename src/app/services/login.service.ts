import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LoginCredential, UserRegistration} from '../models/auth-dtos';
import { BASE_URL, DELETE_PATH, LOGIN_PATH, REGISTER_PATH } from './constants';
import { AuthResult } from '../models/auth-dtos';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  /** Log in user, get the JWT token */
  public async loginUser(credentials: LoginCredential): Promise<AuthResult> {
    const url = BASE_URL + LOGIN_PATH;
    let authResult: AuthResult;
    localStorage.removeItem('id_token');
    try {
      authResult = await this.http.post<AuthResult>(url, credentials).toPromise();
      localStorage.setItem('id_token', authResult.token);
    } catch(err) {
      authResult = {...err.error};
    }
    return authResult;
  }

  /** Log out user, destroy the JWT token */
  public logout(): void {
    localStorage.removeItem('id_token');
  }

  /** Check whether the user is logged in */
  public isLoggedIn(): boolean {
    if (localStorage.getItem('id_token')) {
      return true;
    } else {
      return false;
    }
  }

  /** Register a new user */
  public async registerUser(userRegistration: UserRegistration): Promise<AuthResult> {
    const url = BASE_URL + REGISTER_PATH;
    let authResult: AuthResult;
    localStorage.removeItem('id_token');
    try {
      authResult = await this.http.post<AuthResult>(url, userRegistration).toPromise();
      localStorage.setItem('id_token', authResult.token);
    } catch(err) {
      authResult = {...err.error};
    }
    return authResult;
  }

  /** Delete a user */
  public async deleteUser(userProfileId: number): Promise<AuthResult> {
    const url = BASE_URL + DELETE_PATH + userProfileId;
    let authResult: AuthResult;
    try {
      authResult = await this.http.delete<AuthResult>(url).toPromise();
      localStorage.removeItem('id_token');
    } catch(err) {
      authResult = {...err.error};
    }
    return authResult;
  }


}
