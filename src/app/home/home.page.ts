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

  public userName: string;
  public currentGameMessage: string;

  constructor(public modalController: ModalController, private gameRestService: GameRestService, private gameDataService: GameDataService) { }

  public async ngOnInit(): Promise<void> {
    this.gameRestService.getLoggedInUserProfile().subscribe(resp => {
      this.gameDataService.currentUser = resp;
      this.userName = resp.userName? resp.userName : resp.userEmail;
      console.log(resp);
    });
    this.gameRestService.getAllActiveGames().subscribe(resp => {
      this.gameDataService.activeGames = resp;
      console.log(resp);
    });
    if (this.gameDataService.currentUser.preferredGameId) {
      this.gameRestService.getGameDetailsById(this.gameDataService.currentUser.preferredGameId).subscribe(resp => {
        this.gameDataService.currentGame = resp;
        this.currentGameMessage = `You are current playing ${resp.gameName}. Click here to change the game.`;
        console.log(resp);
      });
    } else {
      this.currentGameMessage = 'You do not have a game selected. Please, click here to select one.';
    }
  }

  async presentAdminUserModal() {
    const modal = await this.modalController.create({
      component: AdminUserComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

}
