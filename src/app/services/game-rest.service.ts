import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { UserProfile } from '../models/user-profile.model';
import { 
  BASE_URL, 
  GAME_ACTIVE_PATH, 
  GAME_BASE_PATH, 
  MEMBER_BASE_PATH, 
  MEMBER_VACATION_PATH, 
  PAYMENT_BASE_PATH, 
  USER_PROFILE_LOGGED_IN_PATH, 
  WEIGHT_BASE_PATH, 
  GAME_DETAILS_PATH, 
  USER_PROFILE_UPDATE_PATH, 
  MEMBER_APPLY_PATH, 
  USER_PROFILE_PREFERRED_GAME_PATH 
} from './constants';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Member } from '../models/member.model';
import { Weight } from '../models/weight.model';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class GameRestService {

  constructor(private http: HttpClient) { }

  public getLoggedInUserProfile(): Observable<UserProfile> {
    const url = BASE_URL + USER_PROFILE_LOGGED_IN_PATH;
    return this.http.get<UserProfile>(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  
  public getGameDetailsById(gameId: number): Observable<Game> {
    const url = BASE_URL + GAME_DETAILS_PATH + gameId;
    return this.http.get<Game>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  public getAllActiveGames(): Observable<Game[]> {
    const url = BASE_URL + GAME_ACTIVE_PATH;
    return this.http.get<Game[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  public updateUserProfile(userProfileId: number, editedUserProfile: UserProfile): Observable<UserProfile> {
    const url = BASE_URL + USER_PROFILE_UPDATE_PATH + userProfileId;
    return this.http.put<UserProfile>(url, editedUserProfile).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  public updatePreferredGame(userProfileId: number, editedUserProfile: UserProfile): Observable<UserProfile> {
    const url = BASE_URL + USER_PROFILE_PREFERRED_GAME_PATH + userProfileId;
    return this.http.put<UserProfile>(url, editedUserProfile).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  /** POST: add a new game to the database */
  public createGame(newGame: Game): Observable<Game> {
    const url = BASE_URL + GAME_BASE_PATH;
    return this.http.post<Game>(url, newGame).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** POST: add a new member to the database */
  public applyToAGame(newMember: Member): Observable<Member> {
    const url = BASE_URL + MEMBER_APPLY_PATH;
    return this.http.post<Member>(url, newMember).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** PUT: update the member on the server. Returns the updated member upon success. */
  public repplyApplication(memberId: number, editedMember: Member): Observable<Member> {
    const url = BASE_URL + MEMBER_BASE_PATH + '/' + memberId;
    return this.http.put<Member>(url, editedMember).pipe(
      retry(3),
      catchError(this.handleError)); // this.handleError('updateHero', hero)
  }

  /** PUT: update the member on the server. Returns the updated member upon success. */
  public setVacationStartDate(memberId: number, editedMember: Member): Observable<Member> {
    const url = BASE_URL + MEMBER_VACATION_PATH + memberId;
    return this.http.put<Member>(url, editedMember).pipe(
      retry(3),
      catchError(this.handleError)); // this.handleError('updateHero', hero)
  }
  
  /** POST: add a new weight to the database */
  public sendWeight(newWeight: Weight): Observable<Weight> {
    const url = BASE_URL + WEIGHT_BASE_PATH;
    return this.http.post<Weight>(url, newWeight).pipe(
      retry(3),
      catchError(this.handleError)); // this.handleError('addHero', hero)
  }

  /** POST: add a new payment to the database */
  public sendPayment(newPayment: Payment): Observable<Payment> {
    const url = BASE_URL + PAYMENT_BASE_PATH;
    return this.http.post<Payment>(url, newPayment).pipe(
      retry(3),
      catchError(this.handleError)); // this.handleError('addHero', hero)
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    console.log(error.status);
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

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  /* private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  } */

}
