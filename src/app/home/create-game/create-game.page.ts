import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Game } from 'src/app/models/game.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.page.html',
  styleUrls: ['./create-game.page.scss'],
})
export class CreateGamePage implements OnInit {

  public gameFormGroup: FormGroup;
  public newGame: Game;

  constructor(private formBuilder: FormBuilder, private gameRestService: GameRestService, private gameDataService: GameDataService) { }

  ngOnInit() {
    this.gameFormGroup = this.formBuilder.group({
      gameName: ['', Validators.required],
      gameDescription: [''],
      startDate: ['', Validators.required],
      // endDate: [''],
      noWeightDays: ['', Validators.required],
      weightFrequency: ['', Validators.required],
      minWeightLoss: ['', Validators.required],
      weightUnit: ['', Validators.required], // enum WeightUnit { kg, lb }
      gameFee: ['', Validators.required],
      currency: ['', Validators.required], // CAD, BRL, USD
      vacationLength: ['', Validators.required],
      lastWeightPaid: [false],
      // isActive: [''],
      weightGoal: ['', Validators.required]
    });
    this.newGame = {weightDates: []};
  }

  public createGame() {
    console.log('Create button clicked');
    console.log(this.gameFormGroup.value);
    const gameInput = {...this.gameFormGroup.value};
    this.newGame = {
      gameName: gameInput.gameName,
      gameDescription: gameInput.gameDescription,
      startDate: gameInput.startDate,
      endDate: this.newGame.endDate,
      weightFrequency: gameInput.weightFrequency,
      minWeightLoss: gameInput.minWeightLoss,
      weightUnit: gameInput.weightUnit,
      gameFee: gameInput.gameFee,
      currency: gameInput.currency,
      vacationLength: gameInput.vacationLength,
      lastWeightPaid: gameInput.lastWeightPaid,
      weightGoal: gameInput.weightGoal,
      weightDates: [...this.newGame.weightDates]
    };
    console.log(this.newGame);
    this.gameRestService.createGame(this.newGame).subscribe(resp => {
      console.log(resp);
    });
  }

  public confirmGameCreation() {
    console.log('Confirm button clicked');
  }

  public setSchedule() {
    console.log('setSchedule() called');
    if (this.gameFormGroup.get('startDate').valid 
        && this.gameFormGroup.get('weightFrequency').valid
        && this.gameFormGroup.get('noWeightDays').valid) {
          this.newGame.weightDates = [];
          switch(this.gameFormGroup.value.weightFrequency) {
            case 'BiWeekly':
              this.setBiWeeklySchedule();
              break;
            case 'Monthly':
              this.setMonthlySchedule();
            default:
              this.setWeeklySchedule();
          }
        }
  }

  public setWeeklySchedule() {
    this.newGame.weightDates = [];
    let startDate = new Date(this.gameFormGroup.value.startDate);
    let noWeightDays = this.gameFormGroup.value.noWeightDays;
    for (let i = 0; i < noWeightDays; i++) {
      let newDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i * 7);
      this.newGame.weightDates.push({scheduledDate: newDate.toISOString()});
    }
    for (let i = 0; i < this.newGame.weightDates.length; i++) {
      console.log(this.newGame.weightDates[i].scheduledDate);
    }
    this.newGame.endDate = this.newGame.weightDates[this.newGame.weightDates.length - 1].scheduledDate;
  }

  public setBiWeeklySchedule() {
    this.newGame.weightDates = [];
    let startDate = new Date(this.gameFormGroup.value.startDate);
    let noWeightDays = this.gameFormGroup.value.noWeightDays;
    for (let i = 0; i < noWeightDays; i++) {
      this.newGame.weightDates.push({scheduledDate: new Date(startDate.getFullYear(),
          startDate.getMonth(), startDate.getDate() + i * 14)});
    }
    for (let i = 0; i < this.newGame.weightDates.length; i++) {
      console.log(this.newGame.weightDates[i].scheduledDate);
    }
    this.newGame.endDate = this.newGame.weightDates[this.newGame.weightDates.length - 1].scheduledDate;
  }

  public setMonthlySchedule() {
    this.newGame.weightDates = [];
    let startDate = new Date(this.gameFormGroup.value.startDate);
    let noWeightDays = this.gameFormGroup.value.noWeightDays;
    for (let i = 0; i < noWeightDays; i++) {
      this.newGame.weightDates.push({scheduledDate: new Date(startDate.getFullYear(),
          startDate.getMonth() + i, startDate.getDate())});
    }
    for (let i = 0; i < this.newGame.weightDates.length; i++) {
      console.log(this.newGame.weightDates[i].scheduledDate);
    }
    this.newGame.endDate = this.newGame.weightDates[this.newGame.weightDates.length - 1].scheduledDate;
  }

}
