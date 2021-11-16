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

  constructor(public modalController: ModalController) { }

  public async ngOnInit(): Promise<void> {

   
  }

  async presentAdminUserModal() {
    const modal = await this.modalController.create({
      component: AdminUserComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

}
