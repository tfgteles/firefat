import { Game } from './game.model';
import { User } from './user.model';

export interface Message {
    id?: number;
    user: User;
    game: Game;
    messageDate: Date;
    messageText: string;
}
