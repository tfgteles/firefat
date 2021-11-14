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

  constructor(private gameDataService: GameDataService, private gameRestService: GameRestService) {
    this.gameMessages = [...this.gameDataService.getGameMessages()];
  }

  ngOnInit() {
  }

  public sendMessage(text: string): void {
    let gameMessage: GameMessage = {
      groupId: this.gameDataService.currentGame.id,
      playerId: this.gameDataService.currentUser.id,
      messageDate: new Date(),
      messageText: text
    };
    this.gameRestService.sendMessage(gameMessage).subscribe(resp => {
      console.log(resp);
      this.gameDataService.currentGame.gameMessages.push({...resp});
      this.gameMessages = [...this.gameDataService.getGameMessages()];
    });
  }

}
