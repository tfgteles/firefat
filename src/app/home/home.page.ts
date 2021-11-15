import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../models/game.model';
import { UserProfile } from '../models/user-profile.model';
import { GameDataService } from '../services/game-data.service';
import { GameRestService } from '../services/game-rest.service';
import { AdminUserComponent } from './admin-user/admin-user.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // public userName: string;
  // public currentGameMessage: string;

  constructor(public modalController: ModalController, private gameRestService: GameRestService, private gameDataService: GameDataService) { }

  public async ngOnInit(): Promise<void> {

    this.gameRestService.startLoading();
    this.gameRestService.getLoggedInUserProfile().subscribe(resp => {
      this.gameDataService.currentUser = {...resp};
      // this.userName = resp.userName? resp.userName : resp.userEmail;
      console.log(resp);
      if (this.gameDataService.currentUser.preferredGameId > 0) {
        this.gameRestService.getGameDetailsById(this.gameDataService.currentUser.preferredGameId).subscribe(resp => {
          this.gameDataService.currentGame = {...resp};
          this.gameDataService.setSortedWeightDates();
          // this.currentGameMessage = `You are currently playing ${resp.gameName}. Click here to change the game.`;
          this.gameDataService.setCurrentGamePlayers();
          this.gameRestService.closeLoading();
        });
      } else {
        // this.currentGameMessage = 'You do not have a game selected. Click here to select one.';
      }
    });
   
  }

  async presentAdminUserModal() {
    const modal = await this.modalController.create({
      component: AdminUserComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

}
