import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
// import { Player } from 'src/app/models/player.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

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
