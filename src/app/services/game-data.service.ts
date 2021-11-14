import { Injectable } from '@angular/core';
import { GameDate, MessageDto, PlayerDebt, PlayerDto, PlayerProgress, PlayerRank } from '../models/game-dtos.model';
import { Game } from '../models/game.model';
import { Member } from '../models/member.model';
import { Payment } from '../models/payment.model';
import { UserProfile } from '../models/user-profile.model';
import { WeightDate } from '../models/weight-date.model';
import { Weight } from '../models/weight.model';


@Injectable({
  providedIn: 'root',
})
export class GameDataService {

  public currentUserEmail = '';
  public currentUser: UserProfile;
  public currentGame: Game;
  public sortedWeightDates: GameDate[] = [];
  public activeGames: Game[];
  public players: PlayerDto[];
  
  constructor() { }

  /**
   * From the members of current game, return the Member Id of the logged in user,
   * if there is not a current game, return 0.
   * @returns {number} Member Id
   */
  public currentMemberId(): number {
    if (this.currentGame) {
      return this.currentGame.members.find(m => m.playerId === this.currentUser.id).id;
    } else {
      return 0;
    }
  }

  /**
   * From the members of current game, return the logged in Member, if there is
   * no current game, returns undefined.
   * @returns {Member}
   */
  public currentMember(): Member {
    if (this.currentGame) {
      return this.currentGame.members.find(m => m.playerId === this.currentUser.id);
    } else {
      return undefined;
    }
  }

  /**
   * Returns today's weightDateId, if there is no current game, returns 0,
   * and if today is not a weightDate, returns -1
   * @returns {number} Today's weightDateId
   */
  public todayWeightDateId(): number {
    if (!this.currentGame) {
      return 0;
    }
    let dateId = -1;
    let dateNow = new Date();
    for (let d of this.sortedWeightDates) {
      if (d.weightDateDate.getDate() === dateNow.getDate()
      && d.weightDateDate.getMonth() === dateNow.getMonth()
      && d.weightDateDate.getFullYear() === dateNow.getFullYear()) {
        dateId = d.weightDateId;
        break;
      }
    }
    return dateId;
  }

  /**
   * Returns the last weight date
   * @returns {Date}
   */
  public getLastWeightDate(): GameDate {
    let dateNow = new Date();
    let lastDate: GameDate;
    for (let i = 0; i < this.sortedWeightDates.length; i++) {
      if (this.sortedWeightDates[i].weightDateDate.valueOf() > dateNow.valueOf()) {
        lastDate = {...this.sortedWeightDates[i - 1]};
        break;
      }
    }
    return lastDate;
  }

  /**
   * Set the array of players for the current game
   */
  public setCurrentGamePlayers() {
    this.players = [];
    this.currentGame.members.forEach(m => {
      this.players.push({
        playerProfileId: m.playerId,
        playerMemberId: m.id,
        firstName: m.firstName,
        lastName: m.lastName,
        userEmail: m.userEmail,
        userName: m.userName ? m.userName : m.firstName ? m.firstName : m.userEmail
      });
    });
  }

  /**
   * Build an array of PlayerProgress, what has happened to date, based on the game rules
   * @returns 
   */
  public playerProgressToDate(memberId: number): PlayerProgress[] {
    let progress: PlayerProgress[] = [];
    let dateNow = new Date();
    let weights: Weight[] = [...this.currentGame.members.find(m => m.id === memberId).weights];
    let minWeight: number;
    let initialWeight: number;
    let vacationDatesId: number[] = this.getVacationDatesId(memberId);
    let minWeightLoss: number = this.currentGame.minWeightLoss;
    let weightGoal: number = this.currentGame.members.find(m => m.id === memberId).weightGoal;
    for (let d of this.sortedWeightDates) {
      if (dateNow.valueOf() - d.weightDateDate.valueOf() < 0) {break;}
      let weight: Weight = weights.find(w => w.dateId === d.weightDateId);
      let weightMeasure = weight? weight.weightMeasure : 0;
      console.log(weightMeasure);
      progress.push({
        id: d.order,
        memberId: memberId,
        weightDateId: d.weightDateId,
        weightDateDate: d.weightDateDate,
        weightMeasure: weightMeasure,
      });
    }
    console.log(progress);
    initialWeight = progress[0].weightMeasure;
    minWeight = initialWeight;
    progress[0].description = 'Initial weight';
    progress[0].charge = 0;
    progress[0].weightLoss = 0;
    progress[0].percentageLoss = 0;
    for (let i = 1; i < progress.length; i++) {
      if (vacationDatesId.includes(progress[i].weightDateId)) { // Vacation
        progress[i].charge = 0;
        progress[i].description = 'Vacation';
        progress[i].weightMeasure = 0;
        progress[i].weightLoss = 0;
        progress[i].percentageLoss = 0;
      } else if (progress[i].weightMeasure === 0) { // WO
        progress[i].description = 'WO';
        progress[i].charge = this.currentGame.gameFee;
        progress[i].weightLoss = 0;
        progress[i].percentageLoss = 0;
      } else if (progress[i].weightMeasure > 0 && progress[i].weightMeasure <= weightGoal) { // Goal achieved
        progress[i].charge = 0;
        progress[i].description = 'Congratulations!!!';
        progress[i].weightLoss = initialWeight - progress[i].weightMeasure;
        progress[i].percentageLoss = (initialWeight - progress[i].weightMeasure) * 100 / initialWeight;
      } else if (progress[i].weightMeasure > 0 && minWeight - progress[i].weightMeasure >= minWeightLoss) { // Lost at least the minimum
        progress[i].charge = 0;
        progress[i].description = 'Good job!';
        progress[i].weightLoss = initialWeight - progress[i].weightMeasure;
        progress[i].percentageLoss = (initialWeight - progress[i].weightMeasure) * 100 / initialWeight;
      } else { // weigh gain, not loss! What a shame!
        progress[i].charge = this.currentGame.gameFee;
        progress[i].description = 'Oooops!';
        progress[i].weightLoss = initialWeight - progress[i].weightMeasure;
        progress[i].percentageLoss = (initialWeight - progress[i].weightMeasure) * 100 / initialWeight;
      }
      if (progress[i].weightMeasure > 0 && progress[i].weightMeasure < minWeight) {
        minWeight = progress[i].weightMeasure;
      }
    }
    if (progress.length === this.sortedWeightDates.length) {
      progress[progress.length - 1].description = 'Last weight';
      if (!this.currentGame.lastWeightPaid) {
        progress[progress.length - 1].charge = 0;
      }
    }
    console.log(progress);
    return progress;
  }

  /**
   * Build an array with vacations' weight dates ids
   * @returns {number[]}
   */
  public getVacationDatesId(memberId: number): number[] {
    let datesId: number[] = [];
    let startDateId: number = this.currentGame.members.find(m => m.id === memberId).vacationStartDateId;
    if (!(startDateId > 0)) {return datesId;}
    let vacationLength = this.currentGame.vacationLength;
    let weightDateVacationIndex: number = this.sortedWeightDates.findIndex(w => w.weightDateId === startDateId);
    for (let i = weightDateVacationIndex; i < weightDateVacationIndex + vacationLength; i++) {
      datesId.push(this.sortedWeightDates[i].weightDateId);
    }
    console.log(datesId);
    return datesId;
  }

  /**
   * Set the array sortedWeightDates of the current game
   */
  public setSortedWeightDates() {
    this.sortedWeightDates = [];
    let weightDates: WeightDate[] = [...this.currentGame.weightDates];
    for (let d of weightDates) {
      this.sortedWeightDates.push({
        weightDateId: d.id,
        weightDateDate: new Date(d.scheduledDate)
      });
    }
    this.sortedWeightDates.sort((w1, w2) => w1.weightDateDate.valueOf() - w2.weightDateDate.valueOf());
    for (let i = 0; i < this.sortedWeightDates.length; i++) {
      this.sortedWeightDates[i].order = i +1;
    }
  }

  /**
   * Returns the game ranking on the last weight date
   */
  public getRanking(): PlayerRank[] {
    let ranking: PlayerRank[] = [];
    let lastDate: GameDate = this.getLastWeightDate();
    let dateId: number = lastDate.weightDateId;
    let initialDateId: number = this.sortedWeightDates[0].weightDateId;
    let members: Member[] = [...this.currentGame.members];
    for (let p of this.players) {
      let weights: Weight[] = [...members.find(m => m.id === p.playerMemberId).weights];
      let currentWeight: number = weights.find(w => w.dateId === dateId)?.weightMeasure;
      currentWeight = currentWeight? currentWeight: 0;
      let initialWeight: number = weights.find(w => w.dateId === initialDateId)?.weightMeasure;
      let weightLoss = currentWeight > 0? initialWeight - currentWeight: 0;
      let percentageLoss = currentWeight > 0? (weightLoss * 100 / initialWeight) : 0;
      p.userName = p.userName? p.userName : (p.firstName || p.lastName)? p.firstName + ' ' + p.lastName : p.userEmail ;
      ranking.push({
        player: {...p},
        weightMeasure: currentWeight,
        initialWeight: initialWeight,
        weightLoss: weightLoss,
        percentageLoss: percentageLoss,
        isGoalAchieved: (currentWeight > 0? currentWeight <= p.weightGoal: false)
      });
    }
    ranking.sort((p1, p2) => p2.percentageLoss - p1.percentageLoss)
    for (let i = 0; i < ranking.length; i++) {
      ranking[i].order = i + 1;
    }
    return ranking;
  }

  /**
   * Returns the debt of each player, and how much they have already paid
   */
  public getPlayersDebt(): PlayerDebt[] {
    let debts: PlayerDebt[] = [];
    for (let p of this.players) {
      let progress: PlayerProgress[] = this.playerProgressToDate(p.playerMemberId);
      let debt: number = 0;
      for (let d of progress) {
        debt += d.charge;
      }
      let paid: number = 0;
      let payments: Payment[] = this.currentGame.members.find(m => m.id === p.playerMemberId)?.payments;
      for (let c of payments) {
        paid += c.amountPaid;
      }
      debts.push({
        player: {...p},
        totalDebt: debt,
        totalPaid: paid
      });
    }
    debts.sort((d1, d2) => d2.totalDebt - d1.totalDebt);
    for (let i = 0; i < debts.length; i++) {
      debts[i].order = i + 1;
    }
    return debts;
  }

  public getGameMessages(): MessageDto[] {
    let messages: MessageDto[] = [];
    for (let m of this.currentGame.gameMessages) {
      messages.push({
        player: this.players.find(p => p.playerProfileId === m.playerId),
        messageDate: new Date(m.messageDate),
        text: m.messageText
      });
    }
    messages.sort((m1, m2) => m2.messageDate.valueOf() - m1.messageDate.valueOf());
    return messages;
  }

}
