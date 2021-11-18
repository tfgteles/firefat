import { Component, OnInit } from '@angular/core';
import { MessageDto } from '../models/game-dtos.model';
import { GameMessage } from '../models/game-message.model';
import { GameDataService } from '../services/game-data.service';
import { GameRestService } from '../services/game-rest.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  public gameMessages: MessageDto[] = [];
  public showSpinner: boolean;

  constructor(private gameDataService: GameDataService, private gameRestService: GameRestService) {
    this.gameMessages = [...this.gameDataService.getGameMessages()].reverse();
  }

  ngOnInit() {
    this.showSpinner = false;
  }

  /** Send messages */
  public sendMessage(text: string): void {
    this.showSpinner = false;
    let gameMessage: GameMessage = {
      groupId: this.gameDataService.currentGame.id,
      playerId: this.gameDataService.currentUser.id,
      messageDate: new Date(),
      messageText: text
    };
    this.gameRestService.sendMessage(gameMessage).subscribe(resp => {
      this.gameDataService.currentGame.gameMessages.push({...resp});
    },
    err => {
      this.showSpinner = false;
      this.gameRestService.showErrorToast(err);
    },
    () => {
      this.showSpinner = false;
      this.gameMessages = [...this.gameDataService.getGameMessages()];
    });
  }

}
