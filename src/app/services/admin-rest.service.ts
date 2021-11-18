import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Game } from '../models/game.model';
import { Member } from '../models/member.model';
import { Payment } from '../models/payment.model';
import { UserProfile } from '../models/user-profile.model';
import { WeightDate } from '../models/weight-date.model';
import { Weight } from '../models/weight.model';
import { BASE_URL, GAME_BASE_PATH, MEMBER_BASE_PATH, PAYMENT_BASE_PATH, USER_PROFILE_BASE_PATH, WEIGHT_BASE_PATH, WEIGHT_DATE_BASE_PATH } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AdminRestService {

  constructor(private http: HttpClient) { }

  /** GET: get all games */
  public getAllGames(): Observable<Game[]> {
    const url = BASE_URL + GAME_BASE_PATH;
    return this.http.get<Game[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** GET: get all user profiles */
  public getAllUserProfiles(): Observable<UserProfile[]> {
    const url = BASE_URL + USER_PROFILE_BASE_PATH;
    return this.http.get<UserProfile[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** GET: get all members */
  public getAllMembers(): Observable<Member[]> {
    const url = BASE_URL + MEMBER_BASE_PATH;
    return this.http.get<Member[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** GET: get all weights */
  public getAllWeights(): Observable<Weight[]> {
    const url = BASE_URL + WEIGHT_BASE_PATH;
    return this.http.get<Weight[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** GET: get all payments */
  public getAllPayments(): Observable<Payment[]> {
    const url = BASE_URL + PAYMENT_BASE_PATH;
    return this.http.get<Payment[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** GET: get all weight dates */
  public getAllWeightDates(): Observable<WeightDate[]> {
    const url = BASE_URL + WEIGHT_DATE_BASE_PATH;
    return this.http.get<WeightDate[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }


  /** Callback function in case of error response */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
  
}
