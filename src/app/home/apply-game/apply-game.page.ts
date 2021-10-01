import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/models/game.model';
import { Member } from 'src/app/models/member.model';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-apply-game',
  templateUrl: './apply-game.page.html',
  styleUrls: ['./apply-game.page.scss'],
})
export class ApplyGamePage implements OnInit {

  public memberFormGroup: FormGroup;
  public newMember: Member;
  public games: Game[];

  constructor(public modalController: ModalController, private formBuilder: FormBuilder, private gameData: GameDataService) { }

  public async ngOnInit(): Promise<void> {
    this.memberFormGroup = this.formBuilder.group({
      gameId: [''],
      weightGoal: [''],
      weightUnit: ['']
    });
    this.games = await this.gameData.getAllActiveGames();
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
    console.log('Apply to a game clicked');
  }

}
