import { Member } from './member.model';
import { WeightDate } from './weight-date.model';
import { GameMessage } from './game-message.model';

export interface Game {
    id?: number;
    gameName: string;
    adminUserId?: number; // Game admin
    gameDescription?: string;
    isActive?: boolean;
    startDate?: Date;
    endDate?: Date;
    weightFrequency?: string; // Weekly, BiWeekly, Monthly
    minWeightLoss: number;
    weightUnit: string; // enum WeightUnit { kg, lb }
    gameFee: number;
    currency: string; // CAD, BRL, USD
    vacationLength: number;
    lastWeightPaid: boolean;
    members?: Member[];
    weightDates?: WeightDate[];
    gameMessages?: GameMessage[];
}
