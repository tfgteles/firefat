export interface AdminGame {
    gameId: number;
    startDate: Date | string;
    endDate: Date | string;
    numberOfMembers: number;
    totalInitialWeight: number;
    totalFinalWeight: number;
    totalWeightLoss: number;
    weightUnit: string;
    averageWeightLoss: number;
    percentageLoss: number;
    totalPaid: number;
    currency: string;
}


export interface AdminMember {
    memberId: number;
    userProfileId: number;
    gameId: number;
    initialWeight: number;
    lastWeight: number;
    weightLoss: number;
    weightUnit: string;
    percentageLoss: number;
    lastDate: Date | string;
    totalPaid: number;
    currency: string;
}

