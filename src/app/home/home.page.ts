import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CurrentGameComponent } from './current-game/current-game.component';
import { ApplyGameComponent } from './apply-game/apply-game.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

// import { PlayerComponent } from '../components/player/player.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public modalController: ModalController) { }

  async presentCurrentGameModal() {
    const modal = await this.modalController.create({
      component: CurrentGameComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

  async presentApplyGameModal() {
    const modal = await this.modalController.create({
      component: ApplyGameComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

  async presentCreateGameModal() {
    const modal = await this.modalController.create({
      component: CreateGameComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

  async presentProfileModal() {
    const modal = await this.modalController.create({
      component: ProfileComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

  async presentAdminUserModal() {
    const modal = await this.modalController.create({
      component: AdminUserComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

  /* async presentPlayerModal() {
    const modal = await this.modalController.create({
      component: PlayerComponent,
    });
    return await modal.present();
  } */

  testClick() {
    console.log('Something clicked!');
  }
}
