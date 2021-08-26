import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
// import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {

  public playerFormGroup: FormGroup;
  // public activePlayer: Player;

  constructor(public modalController: ModalController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.playerFormGroup = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      userName: [''],
      email: [''],
      height: ['']
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
