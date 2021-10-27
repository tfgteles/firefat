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
    console.log('Enter weight button clicked');
    let weight: Weight = {
      groupMemberId: this.memberId,
      dateId: this.dateId,
      weightMeasure: this.weightFormGroup.get('weightMeasure').value
    };
    this.gameRestService.sendWeight(weight).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentGame.members.find(m => m.id === this.memberId).weights.push({...resp});
    });

  }

}
