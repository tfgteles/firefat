import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PlayerComponent } from "../components/player/player.component";
import { GameComponent } from "../components/game/game.component";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(public modalController: ModalController) {}

  async presentPlayerModal() {
    const modal = await this.modalController.create({
      component: PlayerComponent,
    });
    return await modal.present();
  }

  async presentGameModal() {
    const modal = await this.modalController.create({
      component: GameComponent,
    });
    return await modal.present();
  }
}
