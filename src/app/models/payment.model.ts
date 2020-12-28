export interface Payment {
    gameId: string;
    playerId: string;
    paymentDate: Date;
    amountPaid: number;
    receipt?: string;
}