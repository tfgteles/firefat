import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public games: Game[];

  constructor(public modalController: ModalController, private gameRestService: GameRestService, private gameDataService: GameDataService) { }

  public async ngOnInit(): Promise<void> {
    this.gameRestService.getAllActiveGames().subscribe(resp => {
      this.gameDataService.activeGames = resp;
      console.log(resp);
    });
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
