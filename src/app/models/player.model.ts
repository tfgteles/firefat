export interface Player {
    playerId: number; // PK
    playerEmail: string;
    playerUserName?: string;
    playerFirstName: string;
    playerLastName: string;
    playerAvatar?: string;
    playerHeight?: number;
    playerInfo?: string;
    playerCurrentGame?: number; // FK -> gameId
}
