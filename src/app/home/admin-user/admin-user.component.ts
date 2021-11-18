import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminGame, AdminMember } from 'src/app/models/admin-dtos.model';
import { Game } from 'src/app/models/game.model';
import { Member } from 'src/app/models/member.model';
import { Payment } from 'src/app/models/payment.model';
import { UserProfile } from 'src/app/models/user-profile.model';
import { WeightDate } from 'src/app/models/weight-date.model';
import { Weight } from 'src/app/models/weight.model';
import { AdminRestService } from 'src/app/services/admin-rest.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {

  private games: Game[];
  private users: UserProfile[];
  private members: Member[];
  private weightDates: WeightDate[];
  private weights: Weight[];
  private payments: Payment[];
  public isRestCallsDone: boolean[];
  public showSpinner: boolean;
  public adminGames: AdminGame[];
  public adminMembers: AdminMember[];
  public showGamesCard: boolean;
  public showMembersCard: boolean;

  constructor(public modalController: ModalController, private adminRestService: AdminRestService) { }

  ngOnInit() {
    this.showSpinner = true;
    this.isRestCallsDone = [false, false, false, false, false, false];
    this.showGamesCard = false;
    this.showMembersCard = false;
    this.adminRestService.getAllGames().subscribe(
      resp => {
        this.games = [...resp];
        this.isRestCallsDone[0] = true;
        this.setAdminEntities();
      }
    );
    this.adminRestService.getAllUserProfiles().subscribe(
      resp => {
        this.users = [...resp];
        this.isRestCallsDone[1] = true;
        this.setAdminEntities();
      }
    );
    this.adminRestService.getAllMembers().subscribe(
      resp => {
        this.members = [...resp];
        this.isRestCallsDone[2] = true;
        this.setAdminEntities();
      }
    );
    this.adminRestService.getAllWeightDates().subscribe(
      resp => {
        this.weightDates = [...resp];
        this.isRestCallsDone[3] = true;
        this.setAdminEntities();
      }
    );
    this.adminRestService.getAllWeights().subscribe(
      resp => {
        this.weights = [...resp];
        this.isRestCallsDone[4] = true;
        this.setAdminEntities();
      }
    );
    this.adminRestService.getAllPayments().subscribe(
      resp => {
        this.payments = [...resp];
        this.isRestCallsDone[5] = true;
        this.setAdminEntities();
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }

  public toggleShowGamesCard() {
    this.showGamesCard = !this.showGamesCard;
  }

  public toggleShowMembersCard() {
    this.showMembersCard = !this.showMembersCard;
  }

  private setAdminEntities() {
    if (this.isRestCallsDone[0] 
      && this.isRestCallsDone[1] 
      && this.isRestCallsDone[2] 
      && this.isRestCallsDone[3] 
      && this.isRestCallsDone[4] 
      && this.isRestCallsDone[5]) {
        for (let i = 0; i < this.members.length; i++) {
          this.adminMembers[i].memberId = this.members[i].id;
          this.adminMembers[i].userProfileId = this.members[i].playerId;
          this.adminMembers[i].gameId = this.members[i].groupId;
          this.adminMembers[i].weightUnit = this.games.find(g => g.id === this.members[i].groupId).weightUnit;
          this.adminMembers[i].lastDate = this.games.find(g => g.id === this.members[i].groupId).endDate;
          this.adminMembers[i].currency = this.games.find(g => g.id === this.members[i].groupId).currency;
          let memberWeights: Weight[] = this.weights.filter(w => w.groupMemberId === this.members[i].id);
          let minWeight = 10000;
          let maxWeight = 0;
          for (let w of memberWeights) {
            minWeight = w.weightMeasure < minWeight ? w.weightMeasure : minWeight;
            maxWeight = w.weightMeasure > maxWeight ? w.weightMeasure : maxWeight;
          }
          if (memberWeights.length > 0) {
            this.adminMembers[i].initialWeight = maxWeight;
            this.adminMembers[i].lastWeight = minWeight;
            this.adminMembers[i].weightLoss = maxWeight - minWeight;
            this.adminMembers[i].percentageLoss = (maxWeight - minWeight) * 100 / maxWeight;
          } else {
            this.adminMembers[i].initialWeight = 0;
            this.adminMembers[i].lastWeight = 0;
            this.adminMembers[i].weightLoss = 0;
            this.adminMembers[i].percentageLoss = 0;
          }
          let memberPayments = this.payments.filter(p => p.payeeId === this.members[i].id);
          let totalPaid = 0;
          for (let p of memberPayments) {
            totalPaid += p.amountPaid;
          }
          this.adminMembers[i].totalPaid = totalPaid;
        }

        for (let i = 0; i < this.games.length; i++) {
          this.adminGames[i].gameId = this.games[i].id;
          this.adminGames[i].startDate = this.games[i].startDate;
          this.adminGames[i].endDate = this.games[i].endDate;
          this.adminGames[i].weightUnit = this.games[i].weightUnit;
          this.adminGames[i].currency = this.games[i].currency;
          let gameMembers = this.adminMembers.filter(m => m.gameId === this.games[i].id);
          this.adminGames[i].numberOfMembers = gameMembers.length;
          let totalInitialWeight = 0;
          let totalFinalWeight = 0;
          let totalPaid = 0;
          for (let m of gameMembers) {
            totalInitialWeight += m.initialWeight;
            totalFinalWeight += m.lastWeight;
            totalPaid += m.totalPaid;
          }
          this.adminGames[i].totalInitialWeight = totalInitialWeight;
          this.adminGames[i].totalFinalWeight = totalFinalWeight;
          this.adminGames[i].totalPaid = totalPaid;
          this.adminGames[i].totalWeightLoss = totalInitialWeight - totalFinalWeight;
          this.adminGames[i].percentageLoss = this.adminGames[i].totalWeightLoss / this.adminGames[i].totalInitialWeight;
          if (this.adminGames[i].numberOfMembers > 0) {
            this.adminGames[i].averageWeightLoss = this.adminGames[i].totalWeightLoss / this.adminGames[i].numberOfMembers;
          } else {
            this.adminGames[i].averageWeightLoss = 0;
          }
        }
        this.showSpinner = false;
      }
  }

}
