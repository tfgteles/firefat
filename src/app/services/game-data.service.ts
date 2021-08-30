import { Injectable } from '@angular/core';
import { Member } from '../models/member.model';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { Weight } from '../models/weight.model';
import { WeightDate } from '../models/weightdate.model';
import { Message } from '../models/message.model';
import { Payment } from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {

  public currentUser: User;
  private users: User[];
  private games: Game[];
  private selectedGame: Game;

  private members: Member[];
  private weightDates: WeightDate[];
  private messages: Message[];
  private weights: Weight[];
  private payments: Payment[];

  constructor() {
    this.loadFakeUsers();
    this.currentUser = this.getUserByEmail('email2@mail.com');
  }

  public getUserByEmail(userEmail: string): User {
    return this.users.find(p => p.userEmail === userEmail);
  }

  public getUserDetails(userId: number): User {
    return this.users.find(p => p.id === userId);
  }

  public async getAllActiveGames(): Promise<Game[]> {
    return this.games;
  }

  public getGameDetails(gameId: number): Game {
    return this.games.find(g => g.id === gameId);
  }

  public createGame(game: Game) {
    let maxId = 1;
    if (this.games.length > 0) {
      for (const g of this.games) {
        if (g.id > maxId) {
          maxId = g.id;
        }
      }
    }
    game.id = maxId + 1;
    this.games.push(game);
  }

  public createUser(user: User) {
    let maxId = 1;
    if (this.users.length > 0) {
      for (const u of this.users) {
        if (u.id > maxId) {
          maxId = u.id;
        }
      }
    }
    user.id = maxId + 1;
    this.users.push(user);
  }

  /* public applyToAGame(member: Member) {
    let maxId = 1;
    if (members.length > 0) {
      for (const e of appliedGame.gameEnrollments) {
        if (e.enrollmentId > maxId) {
          maxId = e.enrollmentId;
        }
      }
    }
    const enrollment: Enrollment = {
      enrollmentId: maxId + 1,
      game: appliedGame,
      player: applicant,
      weightGoal: goal,
      enrollmentDate: new Date(),
      playerPrivilege: 'idle' // idle, standard, admin
    };
    appliedGame.gameEnrollments.push(enrollment);
  } */

  /* public setPlayerPrivilege(user: User, game: Game, privilege: string) {
    const enrollment: Enrollment = game.gameEnrollments.find(e => e.user.userId === user.userId);
    enrollment.playerPrivilege = privilege;
  } */

  /* public enterWeight(weightedPlayer: Player, weightedGame: Game, playerWeight: number, date: Date) {
    let maxId = 1;
    if (weightedGame.gameWeights.length > 0) {
      for (const w of weightedGame.gameWeights) {
        if (w.weightId > maxId) {
          maxId = w.weightId;
        }
      }
    }
    const weight: Weight = {
      weightId: maxId + 1,
      game: weightedGame,
      player: weightedPlayer,
      weightDate: date,
      weightMeasured: playerWeight,
    };
    weightedGame.gameWeights.push(weight);
  } */

  // public enterPayment(player: Player, game: Game, amout: number, date: Date) { }

  // public setVacationStart(player: Player, game: Game, date: Date) { }

  // Fake data
  public async loadFakeUsers(): Promise<void> {
    this.users = [
      { id: 1, userEmail: 'email1@mail.com', firstName: 'player 1', lastName: 'last name' },
      { id: 2, userEmail: 'email2@mail.com', firstName: 'player 2', lastName: 'last name' },
      { id: 3, userEmail: 'email3@mail.com', firstName: 'player 3', lastName: 'last name' }
    ];
  }

  public async loadFakeGames(): Promise<void> {
    this.games = [
      {
        id: 1,
        gameName: 'Taliban 2019',
        adminUserId: 1,
        startDate: new Date('2019/01/15'),
        endDate: new Date('2019/12/15'),
        weightFrequency: 'Weekly',
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        gameFee: 10,
        currency: 'CAD',
        vacationLength: 4,
        lastWeightPaid: false,
        isActive: true,
        members: [],
        weightDates: [],
        messages: []
      },
      {
        id: 2,
        gameName: 'Taliban 2020',
        adminUserId: 1,
        startDate: new Date('2020/01/15'),
        endDate: new Date('2020/12/15'),
        weightFrequency: 'Weekly',
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        gameFee: 10,
        currency: 'CAD',
        vacationLength: 4,
        lastWeightPaid: false,
        isActive: true,
        members: [],
        weightDates: [],
        messages: []
      },
      {
        id: 3,
        gameName: 'Taliban 2021',
        adminUserId: 3,
        startDate: new Date('2021/01/15'),
        endDate: new Date('2021/12/15'),
        weightFrequency: 'Weekly',
        minWeightLoss: 0.1,
        weightUnit: 'kg',
        gameFee: 10,
        currency: 'CAD',
        vacationLength: 4,
        lastWeightPaid: false,
        isActive: true,
        members: [],
        weightDates: [],
        messages: []
      }
    ];
  }

}
