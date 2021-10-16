import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { Member } from 'src/app/models/member.model';
import { GameDataService } from 'src/app/services/game-data.service';
import { GameRestService } from 'src/app/services/game-rest.service';

@Component({
  selector: 'app-apply-game',
  templateUrl: './apply-game.page.html',
  styleUrls: ['./apply-game.page.scss'],
})
export class ApplyGamePage implements OnInit {

  public memberFormGroup: FormGroup;
  public newMember: Member;
  public games: Game[];
  public selectedGame: Game;
  public isGameSelected: boolean;

  constructor(
    public modalController: ModalController, 
    private formBuilder: FormBuilder, 
    private gameRestService: GameRestService, 
    private gameDataService: GameDataService
    ) { 
      this.memberFormGroup = this.formBuilder.group({
        weightGoal: ['', Validators.required]
      });
    }

  public async ngOnInit(): Promise<void> {

    this.isGameSelected = false;

    this.gameRestService.getAllActiveGames().subscribe(resp => {
      this.gameDataService.activeGames = [...resp];
      this.games = [...resp];
      console.log(resp);
    });

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


  public applyToAGame(): void {

    let member: Member = {
      groupId: this.selectedGame.id,
      playerId: this.gameDataService.currentUser.id,
      weightGoal: this.memberFormGroup.value.weightGoal
    };
    
    console.log(member);

    this.gameRestService.applyToAGame(member).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentUser.membership.push(this.selectedGame);
    });
  }

  public selectGame(game: Game): void {
    this.isGameSelected = true;
    this.selectedGame = game;
  }

}
