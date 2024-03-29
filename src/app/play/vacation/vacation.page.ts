import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { WeightDate } from 'src/app/models/weight-date.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-vacation',
  templateUrl: './vacation.page.html',
  styleUrls: ['./vacation.page.scss'],
})
export class VacationPage implements OnInit {

  public weightDates: WeightDate[] = [];
  public selectedDateId: number = 0;
  public selectedDate: Date;
  public showSpinner: boolean;

  constructor(private gameDataService: GameDataService, private gameRestService: GameRestService, private router: Router) { }

  ngOnInit() {
    this.weightDates = [...this.gameDataService.currentGame.weightDates];
    this.showSpinner = false;
  }

  public selectDate(weightDate: WeightDate) {
    this.selectedDateId = weightDate.id;
    this.selectedDate = new Date(weightDate.scheduledDate);
  }

  public clearSelection() {
    this.selectedDateId = 0;
    this.selectedDate = null;
  }

  public setVacationDate() {
    this.showSpinner = true;
    let member: Member = {...this.gameDataService.currentGame.members.find(m => m.playerId === this.gameDataService.currentUser.id)};
    member.vacationStartDateId = this.selectedDateId;
    this.gameRestService.setVacationStartDate(member.id, member).subscribe(resp => {
      this.gameDataService.currentGame.members.find(m => m.playerId === this.gameDataService.currentUser.id).vacationStartDateId = this.selectedDateId;
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.showSpinner = false;
      this.gameRestService.showSuccessToast('Vacation setup successfully.');
      this.router.navigate(['/main/play']);
    });
  }

}
