import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public games: Game[];

  constructor(public modalController: ModalController, private gameData: GameDataService) { }

  public async ngOnInit(): Promise<void> {
    this.games = await this.gameData.getAllActiveGames();
  }

  /* public async selectGameModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SelectGameComponent,
      componentProps: { games: this.games },
      cssClass: 'standard-modal'
    });
    await modal.present();
    modal.onDidDismiss().then(data => {
      console.log(data.data);
    });
  } */

  public changeCurrentGame() {
    console.log('Current game change button clicked');
  }

}
