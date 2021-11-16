import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../services/game-data.service';
// import { ModalController } from '@ionic/angular';
// import { ChargeComponent } from '../components/charge/charge.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  public isGroupLeader: boolean;
  constructor(private gameDataService: GameDataService/* public modalController: ModalController */) { }

  ngOnInit() {
    this.isGroupLeader = this.gameDataService.currentGame.adminUserId === this.gameDataService.currentUser.id;
  }

  /* async presentChargeModal() {
    const modal = await this.modalController.create({
      component: ChargeComponent,
    });
    return await modal.present();
  } */
}
