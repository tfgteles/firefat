import { Game } from "./game.model";
import { UserProfile } from "./user-profile.model";

export interface GameMessage {
    id?: number;
    gameId: number;
    game?: Game;
    userProfileId?: number;
    userProfile?: UserProfile;
    messageDate?: Date;
    messageText: string;
}
