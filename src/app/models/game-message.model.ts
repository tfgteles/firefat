import { Game } from "./game.model";
import { UserProfile } from "./user-profile.model";

export interface GameMessage {
    id?: number;
    groupId: number; // gameId
    playerId?: number; // userProfileId
    messageDate?: Date | string;
    messageText: string;
}
