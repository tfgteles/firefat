import { Weight } from './weight.model';
import { Payment } from './payment.model';
import { Game } from './game.model';
import { UserProfile } from './user-profile.model';

export interface Member {
    id?: number;
    groupId: number; // gameId
    weightGoal: number;
    playerId: number; // userProfileId
    applicationDate?: Date;
    responseDate?: Date;
    vacationStartDateId?: number; // WeightDateId
    memberStatus?: string; // Applied, Standard, Leader, Denied
    goalAchieved?: boolean;
    weights?: Weight[];
    payments?: Payment[];
}
