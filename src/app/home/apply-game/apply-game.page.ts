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
  public allGames: Game[];
  public filteredGames: Game[];
  private membershipIds: number[];
  public selectedGameName: string = '';
  public selectedGameId: number = 0;
  public selectedGameWeightUnit: string = '';
  public showSpinner: boolean;

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

    this.showSpinner = true;
    this.membershipIds = this.gameDataService.currentUser.membership.map(g => g.id);

    this.gameRestService.getAllActiveGames().subscribe(resp => {
      this.gameDataService.activeGames = [...resp];
      this.allGames = [...resp];
      
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.filteredGames = [...this.allGames].filter(g => !this.membershipIds.includes(g.id));
      this.showSpinner = false;
    });

  }

  /** Apply to a game call */
  public async applyToAGame(): Promise<void> {
    this.showSpinner = true;

    let member: Member = {
      groupId: this.selectedGameId,
      playerId: this.gameDataService.currentUser.id,
      weightGoal: this.memberFormGroup.value.weightGoal
    };
    
    this.gameRestService.applyToAGame(member).subscribe(resp => {
      this.gameDataService.currentUser.membership.push(this.filteredGames.find(g => g.id === this.selectedGameId));
      this.showSpinner = false;
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.gameRestService.showSuccessToast('Application completed, wait the group leader approval.');
      this.router.navigate(['/main/home']);
    });
  }

  /** Helper method to select a game */
  public selectGame(game: Game): void {
    this.selectedGameId = game.id;
    this.selectedGameName = game.gameName;
    this.selectedGameWeightUnit = game.weightUnit;
  }

  /** Helper method to clear selection */
  public clearSelection() {
    this.selectedGameId = 0;
    this.selectedGameName = '';
  }

  /**
   * Helper method to filter the list of game to apply for
   * @param searchString {string} search string
   */
  public filterList(searchString: string): void {
    this.filteredGames = [...this.allGames].filter(g => !this.membershipIds.includes(g.id) && g.gameName.includes(searchString));
  }

  /**
   * Clear the applied filter, show the original list
   */
  public clearGameFilter() {
    this.filteredGames = [...this.allGames].filter(g => !this.membershipIds.includes(g.id));
  }

}
