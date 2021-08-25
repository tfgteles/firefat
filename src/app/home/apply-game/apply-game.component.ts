import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-apply-game',
  templateUrl: './apply-game.component.html',
  styleUrls: ['./apply-game.component.scss'],
})
export class ApplyGameComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }

}
