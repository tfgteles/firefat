import { Game } from './game.model';
import { Player } from './player.model';

export interface Weight {
    weightId: number;
    game: Game;
    player: Player;
    weightDate: Date;
    weightMeasured: number;
    scaleImage?: string;
}
