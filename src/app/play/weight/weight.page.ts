import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameMessage } from 'src/app/models/game-message.model';
import { Member } from 'src/app/models/member.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';
import { Weight } from '../../models/weight.model';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.page.html',
  styleUrls: ['./weight.page.scss'],
})
export class WeightPage implements OnInit {

  public weightFormGroup: FormGroup;
  public dateId: number = 0;
  public memberId: number = 0;
  public currentMember: Member;
  public fileName: string = '';
  public file: File = null;
  public showSpinner: boolean;

  constructor(
    private formBuilder: FormBuilder, 
    private gameRestService: GameRestService,
    private gameDataService: GameDataService,
    private router: Router) { }

  ngOnInit() {
    this.weightFormGroup = this.formBuilder.group({
      weightMeasure: ['', Validators.required]
    });

    this.showSpinner = false;
    this.dateId = this.gameDataService.todayWeightDateId();
    this.memberId = this.gameDataService.currentMemberId();
    this.currentMember = {...this.gameDataService.currentMember()};

  }

  /** Send weight */
  public enterWeight() {
    this.showSpinner = true;
    const formData = new FormData();
    formData.append('groupMemberId', this.memberId.toString());
    formData.append('dateId', this.dateId.toString());
    formData.append('weightMeasure', this.weightFormGroup.get('weightMeasure').value.toString());
    formData.append('scaleImage', this.file, this.fileName);
    this.gameRestService.sendWeight(formData).subscribe(resp => {
      this.gameDataService.currentGame.members.find(m => m.id === this.memberId).weights.push({...resp});
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.showSpinner = false;
      if (this.weightFormGroup.get('weightMeasure').value <= this.currentMember.weightGoal) {
        this.gameRestService.showSuccessToast('Congratulations, you have achieved your goal!');
        let text = '(On behalf of) ' + this.currentMember.userName + ' has achieved the weight goal! Congratulations!';
        let gameMessage: GameMessage = {
          groupId: this.gameDataService.currentGame.id,
          playerId: this.gameDataService.currentGame.adminUserId,
          messageDate: new Date(),
          messageText: text
        };
        this.gameRestService.sendMessage(gameMessage).subscribe(resp => {
          this.gameDataService.currentGame.gameMessages.push({...resp});
        });
      } else {
        this.gameRestService.showSuccessToast('Weight sent successfully.');
      }
      this.router.navigate(['/main/play']);
    });

  }

  /**
   * Upload the file chosen by the user
   * @param evt 
   */
  public loadImage(evt) {
    this.file = <File>evt.target.files[0];
    this.fileName = this.file.name;
  }

  private congratsMessage() {
    //
  }

}
