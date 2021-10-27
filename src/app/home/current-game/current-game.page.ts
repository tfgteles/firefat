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

  constructor(
    public modalController: ModalController, 
    private gameRestService: GameRestService, 
    private gameDataService: GameDataService,
    private router: Router
    ) { }

  public ngOnInit() { 
    this.games = [...this.gameDataService.currentUser.membership.filter(g => g.id !== this.gameDataService.currentUser.preferredGameId)];
  }

  /* public async selectGameModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SelectGameComponent,
      componentProps: { games: this.games },
      cssClass: 'standard-modal'
    });
    await modal.present();
    modal.onDidDismiss().then(data => {
      console.log(data.data);
    });
  } */

  public async updateCurrentGame(preferredGameId: number) {
    let userProfile: UserProfile = {
      id: this.gameDataService.currentUser.id,
      userEmail: this.gameDataService.currentUser.userEmail,
      preferredGameId: preferredGameId
    };
    this.gameRestService.updatePreferredGame(userProfile.id, userProfile).subscribe(() =>{
      this.gameDataService.currentUser.preferredGameId = preferredGameId;
      this.gameRestService.getGameDetailsById(preferredGameId).subscribe(resp => {
        console.log(resp);
        this.gameDataService.currentGame = {...resp};
        this.gameDataService.setSortedWeightDates();
      });
      this.router.navigate(['/main/home']);
    });
  }

}
