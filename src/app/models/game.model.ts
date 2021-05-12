import { Player } from './player.model';
import { Payment } from './payment.model';
import { Enrollment } from './enrollment.model';
import { Weight } from './weight.model';

export interface Game {
    gameId: number;
    gameAdmin: Player;
    creationDate: Date;
    gameName: string;
    gameInfo?: string;
    gameSchedule?: Date[];
    gameEnrollments?: Enrollment[];
    gamePayments?: Payment[];
    gameWeights?: Weight[];
    minLoss?: number;
    weightUnit?: string;
    gameFee?: number;
    feeCurrency?: string;
    vacationLength?: number;
    lastWeightPaid?: boolean;
    isActive?: boolean;
}
