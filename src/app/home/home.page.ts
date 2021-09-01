import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from '../models/game.model';
import { User } from '../models/user.model';
import { GameDataService } from '../services/game-data.service';
import { AdminUserComponent } from './admin-user/admin-user.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public currentUser: User;
  public currentGame: Game;

  constructor(public modalController: ModalController, private gameDataService: GameDataService) { }

  public async ngOnInit(): Promise<void> {
    this.currentUser = await this.gameDataService.getUserByEmail(this.gameDataService.currentUserEmail);
    await this.gameDataService.getAllActiveGames();
    if (this.currentUser.preferredGameId) {
      this.currentGame = await this.gameDataService.getGameById(this.currentUser.preferredGameId);
    }
  }

  async presentAdminUserModal() {
    const modal = await this.modalController.create({
      component: AdminUserComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

  testClick() {
    console.log('Something clicked!');
  }
}
