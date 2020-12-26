import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss'],
})
export class SelectGameComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }

}
