import { Game } from './game.model';
import { Player } from './player.model';

export interface Payment {
    paymentId: number;
    game: Game;
    player: Player;
    paymentDate: Date;
    amountPaid: number;
    receipt?: string;
}
