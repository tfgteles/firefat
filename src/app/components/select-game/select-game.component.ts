import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-select-game',
  templateUrl: './select-game.component.html',
  styleUrls: ['./select-game.component.scss'],
})
export class SelectGameComponent implements OnInit {

  @Input() games: Game[];

  constructor(public modalController: ModalController) { }

  ngOnInit() { }

  public closeModal() {
    this.modalController.dismiss();
  }

  public selectAndCloseModal(selectedGame: Game) {
    this.modalController.dismiss(selectedGame);
  }

}
