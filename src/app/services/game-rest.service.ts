import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
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
  GAME_MESSAGE_BASE_PATH,
  WEIGHT_BASE_PATH,
  PAYMENT_BASE_PATH
} from './constants';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Member } from '../models/member.model';
import { Weight } from '../models/weight.model';
import { Payment } from '../models/payment.model';
import { PlayerDto } from '../models/game-dtos.model';
import { GameMessage } from '../models/game-message.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GameRestService {


  constructor(private http: HttpClient, public loadingController: LoadingController, public toastController: ToastController) {}
  
  /** GET: get the logged in user profile */
  public getLoggedInUserProfile(): Observable<UserProfile> {
    const url = BASE_URL + USER_PROFILE_LOGGED_IN_PATH;
    return this.http.get<UserProfile>(url).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }
  
  /** GET: get game details by game Id - any player */
  public getGameDetailsById(gameId: number): Observable<Game> {
    const url = BASE_URL + GAME_DETAILS_PATH + gameId;
    return this.http.get<Game>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }
  
  /** GET: get all active games - any player */
  public getAllActiveGames(): Observable<Game[]> {
    const url = BASE_URL + GAME_ACTIVE_PATH;
    return this.http.get<Game[]>(url).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** GET: get all players by game Id - player */
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
  
  /** POST: add a new game to the database - any player */
  public createGame(newGame: Game): Observable<Game> {
    const url = BASE_URL + GAME_CREATE_PATH;
    return this.http.post<Game>(url, newGame).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  /** POST: add a new member to the database - player */
  public applyToAGame(newMember: Member): Observable<Member> {
    const url = BASE_URL + MEMBER_APPLY_PATH;
    return this.http.post<Member>(url, newMember).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** PUT: update the member on the server. Returns the updated member upon success. Group leader. */
  public editMember(memberId: number, editedMember: Member): Observable<Member> {
    const url = BASE_URL + MEMBER_BASE_PATH + '/' + memberId;
    return this.http.put<Member>(url, editedMember).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** PUT: update the member on the server. Returns the updated member upon success. Player */
  public setVacationStartDate(memberId: number, editedMember: Member): Observable<Member> {
    const url = BASE_URL + MEMBER_VACATION_PATH + memberId;
    return this.http.put<Member>(url, editedMember).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** POST: add a new weight to the database - group leader */
  public createWeight(weight: Weight): Observable<Weight> {
    const url = BASE_URL + WEIGHT_BASE_PATH;
    return this.http.post<Weight>(url, weight).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** PUT: update the weight on the server. Returns the updated weight upon success. Group leader. */
  public editWeight(weightId: number, weight: Weight): Observable<Weight> {
    const url = BASE_URL + WEIGHT_BASE_PATH + '/' + weightId;
    return this.http.put<Weight>(url, weight).pipe(
      retry(3),
      catchError(this.handleError));
  }
  
  /** POST: add a new weight to the database - player */
  public sendWeight(formData: FormData): Observable<Weight> {
    const url = BASE_URL + WEIGHT_ONDATE_PATH;
    return this.http.post<Weight>(url, formData).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** POST: add a new payment to the database - group leader */
  public createPayment(payment: Payment): Observable<Payment> {
    const url = BASE_URL + PAYMENT_BASE_PATH;
    return this.http.post<Payment>(url, payment).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** POST: add a new payment to the database - player */
  public sendPayment(formData: FormData): Observable<Payment> {
    const url = BASE_URL + PAYMENT_PLAYER_PATH;
    return this.http.post<Payment>(url, formData).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** POST: a message to the database - any player */
  public sendMessage(gameMessage: GameMessage): Observable<GameMessage> {
    const url = BASE_URL + GAME_MESSAGE_BASE_PATH;
    return this.http.post<GameMessage>(url, gameMessage).pipe(
      retry(3),
      catchError(this.handleError));
  }

  /** Callback function in case of error response */
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

  /** Start the spinner */
  public async startLoading() {
    this.loadingController.create({
      message: 'Loading...',
      backdropDismiss: true,
      spinner: 'bubbles'
    }).then((response) => {
      response.present();
    });
  }

  /** Stop the spinner */
  public async closeLoading() {
    this.loadingController.dismiss().then(resp => {
      console.log('Loader closed!', resp);
    }).catch(err => {
      console.log('Error ocurred: ', err);
    });
  }

  public async showSuccessToast(messageString: string) {
    const toast = await this.toastController.create({
      header: 'Success',
      message: messageString,
      position: 'middle',
      color: 'success',
      animated: true,
      buttons: [
        {
          text: 'Close',
          side: 'end',
          role: 'cancel',
          handler: () => {console.log('Cancel clicked!');}
        }
      ]
    });
    await toast.present();
  }

  public async showErrorToast(messageString: string) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: messageString,
      position: 'middle',
      color: 'danger',
      animated: true,
      buttons: [
        {
          text: 'Close',
          side: 'end',
          role: 'cancel',
          handler: () => {console.log('Cancel clicked!');}
        }
      ]
    });
    await toast.present();
  }


}
