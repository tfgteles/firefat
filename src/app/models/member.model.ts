import { Weight } from './weight.model';
import { Payment } from './payment.model';

export interface Member {
    id?: number;
    groupId: number; // gameId
    weightGoal: number;
    playerId: number; // userProfileId
    applicationDate?: Date | string;
    responseDate?: Date | string;
    vacationStartDateId?: number; // WeightDateId
    memberStatus?: string; // Applied, Standard, Leader, Denied
    goalAchieved?: boolean;
    firstName?: string;
    lastName?: string;
    userName?: string;
    userEmail?: string;
    weights?: Weight[];
    payments?: Payment[];
}
