import { Game } from './game.model';

export interface WeightDate {
    id?: number;
    gameId: number;
    game?: Game;
    scheduledDate: Date;
}
