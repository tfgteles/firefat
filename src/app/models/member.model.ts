import { Game } from './game.model';
import { User } from './user.model';
import { WeightDate } from './weightdate.model';
import { Weight } from './weight.model';
import { Payment } from './payment.model';

export interface Member {
    id?: number;
    game: Game;
    user: User;
    weightGoal: number;
    applicationDate: Date;
    responseDate?: Date;
    weightDate?: WeightDate; // Vacation start date
    memberStatus: string; // enum MemberStatus { Applied, Standard, Leader, Denied }
    goalAchieved: boolean;
    weights: Weight[];
    payments: Payment[];
}
