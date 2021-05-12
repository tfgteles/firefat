import { Game } from './game.model';
import { Player } from './player.model';

export interface Enrollment {
    enrollmentId: number;
    game: Game;
    player: Player;
    weightGoal: number;
    enrollmentDate: Date;
    vacationStart?: Date;
    playerPrivilege: string; // idle, standard, admin
}
