import { Game } from './game.model';

export interface WeightDate {
    id?: number;
    game: Game;
    scheduledDate: Date;
}
