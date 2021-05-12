import { Injectable } from '@angular/core';
import { Enrollment } from '../models/enrollment.model';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { Weight } from '../models/weight.model';

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  public gameId;
  public gameParticipants;
  public gameWeights;
  public gamePayments;
  public gameDates;

  // Fake data for test purpose
  private players: Player[] = [
    { playerId: 1, playerEmail: 'email1@mail.com', playerFirstName: 'player 1', playerLastName: 'last name' },
    { playerId: 2, playerEmail: 'email2@mail.com', playerFirstName: 'player 2', playerLastName: 'last name' },
    { playerId: 3, playerEmail: 'email3@mail.com', playerFirstName: 'player 3', playerLastName: 'last name' }
  ];
  private games: Game[] = [
    { gameId: 1, gameAdmin: this.players[1], creationDate: new Date('2019/01/15'), gameName: 'Taliban 2019' },
    { gameId: 2, gameAdmin: this.players[0], creationDate: new Date('2020/01/15'), gameName: 'Taliban 2020' },
    { gameId: 3, gameAdmin: this.players[2], creationDate: new Date('2021/01/15'), gameName: 'Taliban 2021' }
  ];

  constructor() { }

  public getPlayerDetails(playerId: number | string): Player {
    return this.players.find(p => p.playerId === playerId);
  }

  public getAllActiveGames(): Game[] {
    return this.games;
  }

  public getGameDetails(gameId: number | string): Game {
    return this.games.find(g => g.gameId === gameId);
  }

  public createGame(game: Game) {
    let maxId = 1;
    if (this.games.length > 0) {
      for (const g of this.games) {
        if (g.gameId > maxId) {
          maxId = g.gameId;
        }
      }
    }
    game.gameId = maxId + 1;
    this.games.push(game);
  }

  public createPlayer(player: Player) {
    let maxId = 1;
    if (this.players.length > 0) {
      for (const p of this.players) {
        if (p.playerId > maxId) {
          maxId = p.playerId;
        }
      }
    }
    player.playerId = maxId + 1;
    this.players.push(player);
  }

  public applyToAGame(applicant: Player, appliedGame: Game, goal: number) {
    let maxId = 1;
    if (appliedGame.gameEnrollments.length > 0) {
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
  }

  public setPlayerPrivilege(player: Player, game: Game, privilege: string) {
    const enrollment: Enrollment = game.gameEnrollments.find(e => e.player.playerId === player.playerId);
    enrollment.playerPrivilege = privilege;
  }

  public enterWeight(weightedPlayer: Player, weightedGame: Game, playerWeight: number, date: Date) {
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
  }

  public enterPayment(player: Player, game: Game, amout: number, date: Date) { }

  public setVacationStart(player: Player, game: Game, date: Date) { }


}
