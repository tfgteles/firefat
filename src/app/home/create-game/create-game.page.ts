import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Game } from 'src/app/models/game.model';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {

  public gameFormGroup: FormGroup;
  public newGame: Game;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.gameFormGroup = this.formBuilder.group({
      gameName: [''],
      gameDescription: [''],
      startDate: [''],
      endDate: [''],
      weightFrequency: [''],
      minWeightLoss: [''],
      weightUnit: [''], // enum WeightUnit { kg, lb }
      gameFee: [''],
      currency: ['CAD'], // CAD, BRL, USD
      vacationLength: [''],
      lastWeightPaid: [false],
      // isActive: [''],
    });
  }

  public createGame() {
    console.log('Create button clicked');
    console.log(this.gameFormGroup.value);
  }

  public confirmGameCreation() {
    console.log('Confirm button clicked');
  }

}
