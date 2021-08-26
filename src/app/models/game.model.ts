import { Member } from './member.model';
import { WeightDate } from './weightdate.model';
import { Message } from './message.model';

export interface Game {
    id?: number;
    gameName: string;
    adminUserId: number; // Game admin
    gameDescription?: string;
    startDate: Date;
    endDate: Date;
    weightFrequency: string; // enum WeightFrequency { Weekly, BiWeekly, Monthly }
    minWeightLoss: number;
    weightUnit: string; // enum WeightUnit { kg, lb }
    gameFee: number;
    currency: string; // CAD, BRL, USD
    vacationLength: number;
    lastWeightPaid: boolean;
    isActive: boolean;
    members: Member[];
    weightDates: WeightDate[];
    messages: Message[];
}
