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
  public showSpinner: boolean;

  constructor(private formBuilder: FormBuilder, private gameDataService: GameDataService, private gameRestService: GameRestService) { }

  ngOnInit() {
    this.applicants = [...this.gameDataService.currentGame.members.filter(m => m.memberStatus === 'Applied')];
    this.members = [...this.gameDataService.currentGame.members];
    this.gameDates = [...this.gameDataService.sortedWeightDates];
    this.weightUnit = this.gameDataService.currentGame.weightUnit;
    this.currency = this.gameDataService.currentGame.currency;
    this.showCards = [false, false, false, false];
    this.showSpinner = false;
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

  /** Expand and condense the cards */
  public toggleShowCards(cardIndex: number) {
    this.showCards[cardIndex] = !this.showCards[cardIndex];
  }

  /** Update the member's application */
  public replyApplication(memberId: number, newMemberStatus: string) {
    this.showSpinner = true;
    let memberDto: Member = {...this.gameDataService.currentGame.members.find(m => m.id === memberId)};
    let backendMember: Member = {
      id: memberId,
      groupId: memberDto.groupId,
      weightGoal: memberDto.weightGoal,
      playerId: memberDto.playerId,
      applicationDate: memberDto.applicationDate,
      responseDate: memberDto.responseDate,
      vacationStartDateId: memberDto.vacationStartDateId,
      memberStatus: newMemberStatus,
      goalAchieved: memberDto.goalAchieved
    };
    this.gameRestService.editMember(backendMember.id, backendMember).subscribe(() => {
      this.gameDataService.currentGame.members.find(m => m.id === memberId).memberStatus = newMemberStatus;
      this.applicants = [...this.gameDataService.currentGame.members.filter(m => m.memberStatus === 'Applied')];
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.showSpinner = false;
      this.toggleShowCards(0);
      this.gameRestService.showSuccessToast('Application updated successfully.');
    });
  }

  /** Update or create a new member's weight */
  public editWeight() {
    this.showSpinner = true;
    const weight: Weight = {
      groupMemberId: this.editWeightFormGroup.value['participant'],
      dateId: this.editWeightFormGroup.value['dateId'],
      weightMeasure: this.editWeightFormGroup.value['weightMeasure']
    }
    const member: Member = this.gameDataService.currentGame.members.find(m => m.id === weight.groupMemberId);
    let weightId = 0;
    if (member) {
      weightId = member.weights.find(w => w.dateId === weight.dateId)?.id;
    }
    if (weightId > 0) {
      weight.id = weightId;
      weight.scaleImage = member.weights.find(w => w.id === weightId).scaleImage;
      // call put
      this.gameRestService.editWeight(weightId, weight).subscribe(() => {
        this.gameDataService.currentGame.members.find(m => m.id === weight.groupMemberId).weights.find(w => w.id === weightId).weightMeasure = weight.weightMeasure;
      },
      err => {
        this.showSpinner = false;
        this.gameRestService.showErrorToast(err);
      },
      () => {
        this.showSpinner = false;
        this.toggleShowCards(1);
        this.gameRestService.showSuccessToast('Weight updated successfully.');
      });
    } else {
      // call post
      this.gameRestService.createWeight(weight).subscribe(resp => {
        this.gameDataService.currentGame.members.find(m => m.id === weight.groupMemberId).weights.push({...resp});
      },
      err => {
        this.showSpinner = false;
        this.gameRestService.showErrorToast(err);
      },
      () => {
        this.showSpinner = false;
        this.toggleShowCards(1);
        this.gameRestService.showSuccessToast('Weight updated successfully.');
      });
    }
    
  }

  /** Create a new member's payment */
  public sendPayment() {
    this.showSpinner = true;
    const payment: Payment = {
      payeeId: this.editPaymentFormGroup.value['payeeId'],
      paymentDate: this.editPaymentFormGroup.value['paymentDate'],
      amountPaid: this.editPaymentFormGroup.value['amountPaid']
    };
    this.gameRestService.createPayment(payment).subscribe(resp => {
      this.gameDataService.currentGame.members.find(m => m.id = payment.payeeId).payments.push({...resp});
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.showSpinner = false;
      this.toggleShowCards(2);
      this.gameRestService.showSuccessToast('Payment updated successfully.');
    });
    
  }

  /** Set or update member's vacation start date */
  public setVacation() {
    this.showSpinner = true;
    let memberDto: Member = {...this.gameDataService.currentGame.members.find(m => m.id === this.editVacationFormGroup.value['memberId'])};
    memberDto.vacationStartDateId = this.editVacationFormGroup.value['vacationStartDateId'];
    let backendMember: Member = {
      id: memberDto.id,
      groupId: memberDto.groupId,
      weightGoal: memberDto.weightGoal,
      playerId: memberDto.playerId,
      applicationDate: memberDto.applicationDate,
      responseDate: memberDto.responseDate,
      vacationStartDateId: this.editVacationFormGroup.value['vacationStartDateId'],
      memberStatus: memberDto.memberStatus,
      goalAchieved: memberDto.goalAchieved
    };
    this.gameRestService.editMember(backendMember.id, backendMember).subscribe(() => {
      this.gameDataService.currentGame.members.find(m => m.id === backendMember.id).vacationStartDateId = backendMember.vacationStartDateId;
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.showSpinner = false;
      this.toggleShowCards(3);
      this.gameRestService.showSuccessToast('Vacation updated successfully.');
    });
    
  }

}
