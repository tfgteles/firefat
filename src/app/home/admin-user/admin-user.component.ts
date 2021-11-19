import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdminGame, AdminMember } from 'src/app/models/admin-dtos.model';
import { Game } from 'src/app/models/game.model';
import { Member } from 'src/app/models/member.model';
import { Payment } from 'src/app/models/payment.model';
// import { UserProfile } from 'src/app/models/user-profile.model';
// import { WeightDate } from 'src/app/models/weight-date.model';
import { Weight } from 'src/app/models/weight.model';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
})
export class AdminUserComponent implements OnInit {

  private games: Game[];
  // private users: UserProfile[];
  private members: Member[];
  // private weightDates: WeightDate[];
  private weights: Weight[];
  private payments: Payment[];
  public showSpinner: boolean;
  public adminGames: AdminGame[];
  public adminMembers: AdminMember[];
  public showGamesCard: boolean;
  public showMembersCard: boolean;

  constructor(public modalController: ModalController, private adminRestService: AdminRestService, private gameRestService: GameRestService) { }

  ngOnInit() {
    this.showSpinner = true;
    this.showGamesCard = false;
    this.showMembersCard = false;
    this.adminMembers = [];
    this.adminGames = [];
    this.adminRestService.getAllGames().subscribe(
      resp => {
        this.games = [...resp];
      },
      err => {
        this.showSpinner = false;
        this.gameRestService.showErrorToast(err);
      },
      () => {
        this.adminRestService.getAllMembers().subscribe(
          resp => {
            this.members = [...resp];
          },
          err => {
            this.showSpinner = false;
            this.gameRestService.showErrorToast(err);
          },
          () => {
            this.adminRestService.getAllWeights().subscribe(
              resp => {
                this.weights = [...resp];
              },
              err => {
                this.showSpinner = false;
                this.gameRestService.showErrorToast(err);
              },
              () => {
                this.adminRestService.getAllPayments().subscribe(
                  resp => {
                    this.payments = [...resp];
                  },
                  err => {
                    this.showSpinner = false;
                    this.gameRestService.showErrorToast(err);
                  },
                  () => {
                    this.showSpinner = false;
                    this.setAdminEntities();
                  }
                );
              }
            );
          }
        );
      }
    );
    

    /* this.adminRestService.getAllUserProfiles().subscribe(
      resp => {
        this.users = [...resp];
        this.isRestCallsDone[4] = true;
        this.setAdminEntities();
      }
    ); */
    /* this.adminRestService.getAllWeightDates().subscribe(
      resp => {
        this.weightDates = [...resp];
        this.isRestCallsDone[5] = true;
        this.setAdminEntities();
      }
    ); */
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

  /** Setup the stats to show */
  private setAdminEntities() {
    this.showSpinner = true;

    for (let i = 0; i < this.members.length; i++) {
      let adminMember: AdminMember = {
        memberId: this.members[i].id,
        userProfileId: this.members[i].playerId,
        gameId: this.members[i].groupId,
        weightUnit: this.games.find(g => g.id === this.members[i].groupId).weightUnit,
        lastDate: this.games.find(g => g.id === this.members[i].groupId).endDate,
        currency: this.games.find(g => g.id === this.members[i].groupId).currency,
        initialWeight: 0,
        lastWeight: 0,
        weightLoss: 0,
        percentageLoss: 0,
        totalPaid: 0
      };
      
      let memberWeights: Weight[] = this.weights.filter(w => w.groupMemberId === this.members[i].id);
      let minWeight = 10000;
      let maxWeight = 0;
      for (let w of memberWeights) {
        minWeight = w.weightMeasure < minWeight ? w.weightMeasure : minWeight;
        maxWeight = w.weightMeasure > maxWeight ? w.weightMeasure : maxWeight;
      }
      if (memberWeights.length > 0) {
        adminMember.initialWeight = maxWeight;
        adminMember.lastWeight = minWeight;
        adminMember.weightLoss = maxWeight - minWeight;
        adminMember.percentageLoss = (maxWeight - minWeight) * 100 / maxWeight;
      }
      let memberPayments = this.payments.filter(p => p.payeeId === this.members[i].id);
      let totalPaid = 0;
      for (let p of memberPayments) {
        totalPaid += p.amountPaid;
      }
      adminMember.totalPaid = totalPaid;
      this.adminMembers.push(adminMember);
    }

    for (let i = 0; i < this.games.length; i++) {
      let gameMembers = this.adminMembers.filter(m => m.gameId === this.games[i].id);
      let totalInitialWeight = 0;
      let totalFinalWeight = 0;
      let totalPaid = 0;
      for (let m of gameMembers) {
        totalInitialWeight += m.initialWeight;
        totalFinalWeight += m.lastWeight;
        totalPaid += m.totalPaid;
      }
      let adminGame: AdminGame = {
        gameId: this.games[i].id,
        startDate: this.games[i].startDate,
        endDate: this.games[i].endDate,
        weightUnit: this.games[i].weightUnit,
        currency: this.games[i].currency,
        numberOfMembers: gameMembers.length,
        totalInitialWeight: totalInitialWeight,
        totalFinalWeight: totalFinalWeight,
        totalWeightLoss: totalInitialWeight - totalFinalWeight,
        percentageLoss: 0,
        totalPaid: totalPaid,
        averageWeightLoss: 0
      };
      if (totalInitialWeight > 0) {
        adminGame.percentageLoss = (totalInitialWeight - totalFinalWeight) / totalInitialWeight;
      }
      if (adminGame.numberOfMembers > 0) {
        adminGame.averageWeightLoss = adminGame.totalWeightLoss / adminGame.numberOfMembers;
      }
      this.adminGames.push(adminGame);
    }

    this.showSpinner = false;
  }

  /** Sort the games according to the chosen criteria */
  public sortAdminGames(criteriaString: string) {
    switch (criteriaString) {
      case 'total':
        this.adminGames.sort((g1, g2) => g2.totalWeightLoss - g1.totalWeightLoss);
        break;
      case 'percentual':
        this.adminGames.sort((g1, g2) => g2.percentageLoss - g1.percentageLoss);
        break;
      case 'average':
        this.adminGames.sort((g1, g2) => g2.averageWeightLoss - g1.averageWeightLoss);
        break;
      case 'recent':
        this.adminGames.sort((g1, g2) => (new Date(g2.endDate)).valueOf() - (new Date(g1.endDate)).valueOf());
      default:
        this.adminGames.sort((g1, g2) => g2.gameId - g1.gameId);
    }
  }

  /** Sort the members according to the chosen criteria */
  public sortAdminMembers(criteriaString: string) {
    switch (criteriaString) {
      case 'weight':
        this.adminMembers.sort((g1, g2) => g2.weightLoss - g1.weightLoss);
        break;
      case 'percentual':
        this.adminMembers.sort((g1, g2) => g2.percentageLoss - g1.percentageLoss);
        break;
      case 'recent':
        this.adminMembers.sort((g1, g2) => (new Date(g2.lastDate)).valueOf() - (new Date(g1.lastDate)).valueOf());
      default:
        this.adminMembers.sort((g1, g2) => g2.memberId - g1.memberId);
    }
  }

}
