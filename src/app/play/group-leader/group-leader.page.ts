import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameDate } from 'src/app/models/game-dtos.model';
import { Member } from 'src/app/models/member.model';
import { Payment } from 'src/app/models/payment.model';
import { Weight } from 'src/app/models/weight.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-group-leader',
  templateUrl: './group-leader.page.html',
  styleUrls: ['./group-leader.page.scss'],
})
export class GroupLeaderPage implements OnInit {

  public editWeightFormGroup: FormGroup;
  public editPaymentFormGroup: FormGroup;
  public editVacationFormGroup: FormGroup;
  public applicants: Member[];
  public members: Member[];
  public gameDates: GameDate[];
  public weightUnit: string;
  public currency: string;
  public showCards: boolean[];

  constructor(private formBuilder: FormBuilder, private gameDataService: GameDataService, private gameRestService: GameRestService) { }

  ngOnInit() {
    this.applicants = [...this.gameDataService.currentGame.members.filter(m => m.memberStatus === 'Applied')];
    this.members = [...this.gameDataService.currentGame.members];
    this.gameDates = [...this.gameDataService.sortedWeightDates];
    this.weightUnit = this.gameDataService.currentGame.weightUnit;
    this.currency = this.gameDataService.currentGame.currency;
    this.showCards = [false, false, false, false];
    this.editWeightFormGroup = this.formBuilder.group({
      participant: ['', Validators.required],
      dateId: ['', Validators.required],
      weightMeasure: ['', Validators.required]
    });
    this.editPaymentFormGroup = this.formBuilder.group({
      payeeId: ['', Validators.required],
      paymentDate: ['', Validators.required],
      amountPaid: ['', Validators.required]
    });
    this.editVacationFormGroup = this.formBuilder.group({
      memberId: ['', Validators.required],
      vacationStartDateId: ['', Validators.required]
    });
  }

  public toggleShowCards(cardIndex: number) {
    console.log('Toggled:', cardIndex);
    this.showCards[cardIndex] = !this.showCards[cardIndex];
  }

  public acceptMember(memberId: number) {
    console.log(memberId);
  }

  public denyMember(memberId: number) {
    console.log(memberId);
  }

  public editWeight() {
    const weight: Weight = {
      groupMemberId: this.editWeightFormGroup.value['participant'],
      dateId: this.editWeightFormGroup.value['dateId'],
      weightMeasure: this.editWeightFormGroup.value['weightMeasure']
    }
    console.log(weight);
    const member: Member = this.gameDataService.currentGame.members.find(m => m.id === weight.groupMemberId);
    let weightId = 0;
    if (member) {
      weightId = member.weights.find(w => w.dateId === weight.dateId)?.id;
    }
    if (weightId > 0) {
      // call put
    } else {
      // call post
    }
  }

  public editPayment() {
    const payment: Payment = {
      payeeId: this.editPaymentFormGroup.value['payeeId'],
      paymentDate: this.editPaymentFormGroup.value['paymentDate'],
      amountPaid: this.editPaymentFormGroup.value['amountPaid']
    };
    console.log(payment);
    // call post
  }

  public editVacation() {
    // this.gameRestService.startLoading();
    let member: Member = {...this.gameDataService.currentGame.members.find(m => m.id === this.editVacationFormGroup.value['memberId'])};
    member.vacationStartDateId = this.editVacationFormGroup.value['vacationStartDateId'];
    console.log(member);
    /* this.gameRestService.setVacationStartDate(member.id, member).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentGame.members.find(m => m.playerId === this.gameDataService.currentUser.id).vacationStartDateId = this.selectedDateId;
      this.gameRestService.closeLoading();
    }); */
  }

}
