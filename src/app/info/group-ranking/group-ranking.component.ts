import { Component, OnInit } from '@angular/core';
import { PlayerRank } from 'src/app/models/game-dtos.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-group-ranking',
  templateUrl: './group-ranking.component.html',
  styleUrls: ['./group-ranking.component.scss'],
})
export class GroupRankingComponent implements OnInit {

  public ranking: PlayerRank[];
  public weightUnit: string;

  constructor(private gameDataService: GameDataService, private gameRestService: GameRestService) { }

  ngOnInit() {
    this.gameRestService.getPlayersByGameId(this.gameDataService.currentGame.id).subscribe(resp => {
      console.log(resp);
      this.gameDataService.players = [...resp];
      this.ranking = this.gameDataService.getRanking();
      this.weightUnit = this.gameDataService.currentGame.weightUnit;
    });
  }

}
