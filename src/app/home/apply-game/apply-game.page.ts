import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public selectedGameName: string = '';
  public selectedGameId: number = 0;
  public selectedGameWeightUnit: string = '';

  constructor(
    public modalController: ModalController, 
    private formBuilder: FormBuilder, 
    private gameRestService: GameRestService, 
    private gameDataService: GameDataService,
    private router: Router
    ) { 
      this.memberFormGroup = this.formBuilder.group({
        weightGoal: ['', Validators.required]
      });
    }

  public async ngOnInit(): Promise<void> {


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
      groupId: this.selectedGameId,
      playerId: this.gameDataService.currentUser.id,
      weightGoal: this.memberFormGroup.value.weightGoal
    };
    
    console.log(member);

    this.gameRestService.applyToAGame(member).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentUser.membership.push(this.games.find(g => g.id === this.selectedGameId));
      this.router.navigate(['/main/home']);
    });
  }

  public selectGame(game: Game): void {
    this.selectedGameId = game.id;
    this.selectedGameName = game.gameName;
    this.selectedGameWeightUnit = game.weightUnit;
  }

  public clearSelection() {
    this.selectedGameId = 0;
    this.selectedGameName = '';
  }

}
