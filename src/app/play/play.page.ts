import { Component, OnInit } from '@angular/core';
import { GameDataService } from '../services/game-data.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  public isGroupLeader: boolean;
  
  constructor(private gameDataService: GameDataService) { }

  ngOnInit() {
    this.isGroupLeader = this.gameDataService.currentGame.adminUserId === this.gameDataService.currentUser.id
                          || this.gameDataService.currentUser.isAppAdmin;
  }

}
