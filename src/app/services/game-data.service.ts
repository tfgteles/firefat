import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Game } from '../models/game.model';
import { UserProfile } from '../models/user-profile.model';
import { Weight } from '../models/weight.model';
import { WeightDate } from '../models/weight-date.model';
import { GameMessage } from '../models/game-message.model';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {

  public currentUserEmail = '';
  public currentUser: UserProfile;
  public currentGame: Game;
  
  private users: UserProfile[];
  private games: Game[];
  private selectedGame: Game;

  private members: Member[];
  private weightDates: WeightDate[];
  private messages: GameMessage[];
  private weights: Weight[];
  private payments: Payment[];

  constructor() { }


}
