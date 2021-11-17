import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { GameDataService } from '../services/game-data.service';
import { GameRestService } from '../services/game-rest.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public hasCurrentGame: boolean;

  constructor(
    private loginService: LoginService, 
    private gameDataService: GameDataService, 
    private gameRestService: GameRestService,
    public loadingController: LoadingController
    ) { }

  public async ngOnInit(): Promise<void> {
    this.hasCurrentGame = false;

    // this.gameRestService.startLoading();
    this.gameRestService.getLoggedInUserProfile().subscribe(resp => {
      this.gameDataService.currentUser = {...resp};
      console.log(resp);
      if (this.gameDataService.currentUser.preferredGameId > 0) {
        this.gameRestService.getGameDetailsById(this.gameDataService.currentUser.preferredGameId).subscribe(resp => {
          this.gameDataService.currentGame = {...resp};
          this.hasCurrentGame = true;
          this.gameDataService.setSortedWeightDates();
          this.gameDataService.setCurrentGamePlayers();
          // this.gameRestService.closeLoading();
        });
      } else {
        // this.gameRestService.closeLoading();
      }
    });
  }

  public logout() {
    this.loginService.logout();
  }

}
