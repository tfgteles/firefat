import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public showSpinner: boolean;

  constructor(
    private loginService: LoginService, 
    private gameDataService: GameDataService, 
    private gameRestService: GameRestService,
    private router: Router) { }

    /** Do the initial load: user and game */
  public async ngOnInit(): Promise<void> {
    this.hasCurrentGame = false;
    this.showSpinner = true;
    this.gameRestService.getLoggedInUserProfile().subscribe(resp => {
      this.gameDataService.currentUser = {...resp};
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      if (this.gameDataService.currentUser.preferredGameId > 0) {
        this.gameRestService.getGameDetailsById(this.gameDataService.currentUser.preferredGameId).subscribe(resp => {
          this.gameDataService.currentGame = {...resp};
          this.hasCurrentGame = true;
          this.gameDataService.setSortedWeightDates();
          this.gameDataService.setCurrentGamePlayers();
          this.showSpinner = false;
        },
        err => {
          this.showSpinner = false;
          this.gameRestService.showErrorToast(err);
        });
      } else {
        this.showSpinner = false;
      }
    });
  }

  /** Call the log out service and redirect the user to the log in page */
  public logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
