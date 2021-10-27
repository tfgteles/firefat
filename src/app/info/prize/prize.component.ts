import { Component, OnInit } from '@angular/core';
import { PlayerDebt } from 'src/app/models/game-dtos.model';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-prize',
  templateUrl: './prize.component.html',
  styleUrls: ['./prize.component.scss'],
})
export class PrizeComponent implements OnInit {

  public playersDebt: PlayerDebt[];
  public currency: string;
  public gamePrize: number;
  public gameCash: number;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit() {
    this.playersDebt = this.gameDataService.getPlayersDebt();
    this.currency = this.gameDataService.currentGame.currency;
    this.gamePrize = 0;
    this.gameCash = 0;
    for (let d of this.playersDebt) {
      this.gamePrize += d.totalDebt;
      this.gameCash += d.totalPaid;
    }
  }

}
