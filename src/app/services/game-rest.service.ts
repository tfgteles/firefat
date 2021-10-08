import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { UserProfile } from '../models/user-profile.model';
import { BASE_URL, GAME_ACTIVE_PATH, GAME_DETAIL_PATH, USER_PROFILE_LOGGED_IN_PATH, USER_PROFILE_UPDATE_PATH } from './constants';

@Injectable({
  providedIn: 'root'
})
export class GameRestService {

  constructor(private http: HttpClient) { }

  public async getLoggedInUserProfile(): Promise<UserProfile> {
    const url = BASE_URL + USER_PROFILE_LOGGED_IN_PATH;
    let loggedInUserProfile: UserProfile;
    loggedInUserProfile = await this.http.get<UserProfile>(url).toPromise();
    console.log(loggedInUserProfile);
    return loggedInUserProfile;
  }

  public async getGameDetailsById(gameId: number): Promise<Game> {
    const url = BASE_URL + GAME_DETAIL_PATH + gameId;
    let gameDetail: Game;
    gameDetail = await this.http.get<Game>(url).toPromise();
    return gameDetail;
  }

  public async getAllActiveGames(): Promise<Game[]> {
    const url = BASE_URL + GAME_ACTIVE_PATH;
    let activeGames: Game[];
    activeGames = await this.http.get<Game[]>(url).toPromise();
    return activeGames;
  }

  public async updateUserProfile(userProfileId: number, editedUserProfile: UserProfile): Promise<void> {
    const url = BASE_URL + USER_PROFILE_UPDATE_PATH + userProfileId;
    await this.http.put(url, editedUserProfile).toPromise();
  }
}
