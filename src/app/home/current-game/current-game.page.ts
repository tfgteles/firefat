import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { UserProfile } from 'src/app/models/user-profile.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.page.html',
  styleUrls: ['./current-game.page.scss'],
})
export class CurrentGamePage implements OnInit {

  public games: Game[] = [];
  public selectedGame: Game;
  public isGameSelected: boolean;
  public selectedMemberStatus; string;
  public showSpinner: boolean;

  constructor(
    public modalController: ModalController, 
    private gameRestService: GameRestService, 
    private gameDataService: GameDataService,
    private router: Router) { }

  public ngOnInit() { 
    this.games = [...this.gameDataService.currentUser.membership.filter(g => g.id !== this.gameDataService.currentUser.preferredGameId)];
    this.showSpinner = false;
  }

  /**
   * Set or update the user's current game, and load that game details
   */
  public async updateCurrentGame() {
    this.showSpinner = true;
    let userProfile: UserProfile = {
      id: this.gameDataService.currentUser.id,
      userEmail: this.gameDataService.currentUser.userEmail,
      preferredGameId: this.selectedGame.id
    };
    this.gameRestService.updatePreferredGame(userProfile.id, userProfile).subscribe(() =>{
      this.gameDataService.currentUser.preferredGameId = userProfile.preferredGameId;
      
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.showSpinner = true;
      this.gameRestService.getGameDetailsById(userProfile.preferredGameId).subscribe(resp => {
        this.gameDataService.currentGame = {...resp};
        this.gameDataService.setSortedWeightDates();
        this.gameDataService.setCurrentGamePlayers();
        this.showSpinner = false;
      },
      err => {
        this.showSpinner = false;
        this.gameRestService.showErrorToast(err);
      },
      () => {
        this.gameRestService.showSuccessToast('Current game successfully set up.');
        this.router.navigate(['/main/home']);
      });
    });
  }

  /** Select a game from the list to be the current game */
  public selectGame(game: Game) {
    this.showSpinner = true;
    this.gameRestService.getGameMembers(game.id).subscribe(
      resp => {
        let members = [...resp].filter(m => m.playerId === this.gameDataService.currentUser.id);
        this.selectedMemberStatus = members.length > 0 ? members[0].memberStatus : '';
      },
      err => {
        this.showSpinner = false;
        this.gameRestService.showErrorToast(err);
      },
      () => {
        this.showSpinner = false;
        if (this.selectedMemberStatus === 'Applied') {
          this.gameRestService.showErrorToast('Sorry, the group leader has not approved this application.');
        } else if (this.selectedMemberStatus === 'Denied') {
          this.gameRestService.showErrorToast('Sorry, the group leader has denied this application.');
        } else if (this.selectedMemberStatus === 'Player' 
                    || this.selectedMemberStatus === 'GroupLeader' 
                    || this.gameDataService.currentUser.isAppAdmin) {
          this.selectedGame = {...game};
          this.isGameSelected = true;
        }
      }
    );
  }

  /** Clear the game selection, go back to full list */
  public clearSelection() {
    this.isGameSelected = false;
    this.selectedGame = null;
  }

}
