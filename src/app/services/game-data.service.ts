import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {

  public currentUserEmail = '';
  public currentUser: UserProfile;
  public currentGame: Game;

  public activeGames: Game[];
  
  constructor() { }

}
