import { Game } from './game.model';

export interface WeightDate {
    id?: number;
    groupId?: number; // gameId
    scheduledDate: Date;
}
