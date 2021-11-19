import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GameDataService } from '../services/game-data.service';
import { AdminUserComponent } from './admin-user/admin-user.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public isAppAdmin: boolean;
  
  constructor(public modalController: ModalController, private gameDataService: GameDataService) { }

  ngOnInit() {
    this.isAppAdmin = true;
    this.isAppAdmin = this.gameDataService.currentUser?.isAppAdmin;
  }


  async presentAdminUserModal() {
    const modal = await this.modalController.create({
      component: AdminUserComponent,
      cssClass: 'standard-modal'
    });
    return await modal.present();
  }

}
