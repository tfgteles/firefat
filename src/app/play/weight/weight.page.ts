import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public fileName: string = '';
  public file: File = null;

  constructor(private formBuilder: FormBuilder, 
    private gameRestService: GameRestService,
    private gameDataService: GameDataService) { }

  ngOnInit() {
    this.weightFormGroup = this.formBuilder.group({
      weightMeasure: ['', Validators.required]
    });

    this.dateId = this.gameDataService.todayWeightDateId();
    this.memberId = this.gameDataService.currentMemberId();

  }

  public enterWeight() {
    const formData = new FormData();
    formData.append('groupMemberId', this.memberId.toString());
    formData.append('dateId', this.dateId.toString());
    formData.append('weightMeasure', this.weightFormGroup.get('weightMeasure').value.toString());
    formData.append('scaleImage', this.file, this.fileName);
    this.gameRestService.sendWeight(formData).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentGame.members.find(m => m.id === this.memberId).weights.push({...resp});
    });

  }

  /**
   * Upload the file chosen by the user
   * @param evt 
   */
  public loadImage(evt) {
    console.log(evt.target.files[0]);
    this.file = <File>evt.target.files[0];
    this.fileName = this.file.name;
  }

}
