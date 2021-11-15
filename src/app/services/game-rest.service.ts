import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { UserProfile } from '../models/user-profile.model';
import { 
  BASE_URL, 
  GAME_ACTIVE_PATH, 
  MEMBER_BASE_PATH, 
  MEMBER_VACATION_PATH, 
  USER_PROFILE_LOGGED_IN_PATH, 
  GAME_DETAILS_PATH, 
  USER_PROFILE_UPDATE_PATH, 
  MEMBER_APPLY_PATH, 
  USER_PROFILE_PREFERRED_GAME_PATH, 
  GAME_CREATE_PATH,
  WEIGHT_ONDATE_PATH,
  PAYMENT_PLAYER_PATH,
  GAME_PLAYERS_PATH,
  GAME_MESSAGE_BASE_PATH
} from './constants';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Member } from '../models/member.model';
import { Weight } from '../models/weight.model';
import { Payment } from '../models/payment.model';
import { PlayerDto } from '../models/game-dtos.model';
import { GameMessage } from '../models/game-message.model';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GameRestService {

  constructor(private http: HttpClient, public loadingController: LoadingController) { }

  /** GET: get the logged in user profile */
  public getLoggedInUserProfile(): Observable<UserProfile> {
    const url = BASE_URL + USER_PROFILE_LOGGED_IN_PATH;
    return this.http.get<UserProfile>(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  
  /** GET: get game details by game Id */
  public getGameDetailsById(gameId: number): Observable<Game> {
    const url = BASE_URL + GAME_DETAILS_PATH + gameId;
    return this.http.get<Game>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  /** GET: get all active games */
  public getAllActiveGames(): Observable<Game[]> {
    const url = BASE_URL + GAME_ACTIVE_PATH;
    return this.http.get<Game[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** GET: get all players by game Id */
  public getPlayersByGameId(gameId: number): Observable<PlayerDto[]> {
    const url = BASE_URL + GAME_PLAYERS_PATH + gameId;
    return this.http.get<PlayerDto[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  /** PUT: update the logged in user profile */
  public updateUserProfile(userProfileId: number, editedUserProfile: UserProfile): Observable<UserProfile> {
    const url = BASE_URL + USER_PROFILE_UPDATE_PATH + userProfileId;
    return this.http.put<UserProfile>(url, editedUserProfile).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** PUT: updated the preferred, or current, game of the logged in user progile */
  public updatePreferredGame(userProfileId: number, editedUserProfile: UserProfile): Observable<UserProfile> {
    const url = BASE_URL + USER_PROFILE_PREFERRED_GAME_PATH + userProfileId;
    return this.http.put<UserProfile>(url, editedUserProfile).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  /** POST: add a new game to the database */
  public createGame(newGame: Game): Observable<Game> {
    const url = BASE_URL + GAME_CREATE_PATH;
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
  public sendWeight(formData: FormData): Observable<Weight> {
    const url = BASE_URL + WEIGHT_ONDATE_PATH;
    return this.http.post<Weight>(url, formData).pipe(
      retry(3),
      catchError(this.handleError)); // this.handleError('addHero', hero)
  }

  /** POST: add a new payment to the database */
  public sendPayment(formData: FormData): Observable<Payment> {
    const url = BASE_URL + PAYMENT_PLAYER_PATH;
    return this.http.post<Payment>(url, formData).pipe(
      retry(3),
      catchError(this.handleError)); // this.handleError('addHero', hero)
  }

  /** POST: a message to the database */
  public sendMessage(gameMessage: GameMessage): Observable<GameMessage> {
    const url = BASE_URL + GAME_MESSAGE_BASE_PATH;
    return this.http.post<GameMessage>(url, gameMessage).pipe(
      retry(3),
      catchError(this.handleError)); // this.handleError('addHero', hero)
  }

  /** Callback function in case of error response */
  private handleError(error: HttpErrorResponse) {
    this.closeLoading();
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

  public startLoading() {
    this.loadingController.create({
      message: "Loading..."
    }).then((response) => {
      response.present();
    });
  }

  public closeLoading() {
    this.loadingController.dismiss().then(resp => {
      console.log('Loader closed!', resp);
    }).catch(err => {
      console.log('Error ocurred: ', err);
    });
  }


}
