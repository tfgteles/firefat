export interface FireFatGame {
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

export interface FireFatPlayer {
    playerId: string;
    playerEmail: string;
    playerName: string;
    playerAvatar?: string;
    playerHeight?: number;
    playerInfo?: string;
    playerCurrentGame: string;
}

export interface FireFatPayment {
    gameId: string;
    playerId: string;
    paymentDate: Date;
    amountPaid: number;
    receipt?: string;
}

export interface FireFatWeight {
    gameId: string;
    playerId: string;
    weightDate: Date;
    weightMeasured: number;
    scaleImage?: string;
}

export interface FireFatGroup {
    gameId: string;
    playerId: string;
    weightGoal: number;
    vacationStart: string; // dateId from FireFatSchedule
    playerPrivilege: string; // null, standard, admin
}

export interface FireFatSchedule {
    gameId: string;
    dateId: string;
    weightDate: Date;
}
