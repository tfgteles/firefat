export interface Game {
    gameId: string;
    gameAdmin: string;
    gameName: string;
    gameInfo?: string;
    gameStart: Date;
    numberOfWeights: number;
    weightFrequency: string;
    minLoss: number;
    weightUnit: string;
    gameFee: number;
    feeCurrency: string;
    vacationLength: number;
    lastWeightPaid: boolean;
    isActive: boolean;
}
