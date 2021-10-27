import { Component, OnInit } from '@angular/core';
import { PlayerProgress } from 'src/app/models/game-dtos.model';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-personal-progress',
  templateUrl: './personal-progress.component.html',
  styleUrls: ['./personal-progress.component.scss'],
})
export class PersonalProgressComponent implements OnInit {

  public progress: PlayerProgress[];
  public weightUnit: string;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit() {
    let memberId = this.gameDataService.currentMemberId();
    this.progress = [...this.gameDataService.playerProgressToDate(memberId)].reverse();
    this.weightUnit = this.gameDataService.currentGame.weightUnit;
  }

}
