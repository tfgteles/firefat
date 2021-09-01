import { Component, OnInit } from '@angular/core';
// import { ModalController } from '@ionic/angular';
// import { ChargeComponent } from '../components/charge/charge.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {
  constructor(/* public modalController: ModalController */) { }

  ngOnInit() { }

  /* async presentChargeModal() {
    const modal = await this.modalController.create({
      component: ChargeComponent,
    });
    return await modal.present();
  } */
}
