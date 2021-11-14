export interface PlayerProgress {
    id: number | string;
    memberId: number;
    weightDateId: number;
    weightDateDate: Date;
    weightMeasure: number;
    weightLoss?: number;
    percentageLoss?: number;
    charge?: number;
    description?: string;
}

export interface PlayerDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  userName?: string;
  userEmail?: string;
  playerProfileId?: number; // userProfile id
  playerMemberId?: number; // member id
  weightGoal?: number;
}

export interface GameDate {
  order?: number; 
  weightDateId: number; 
  weightDateDate: Date;
}

export interface PlayerRank {
  order?: number;
  player?: PlayerDto;
  weightMeasure?: number;
  initialWeight?: number;
  weightLoss?: number;
  percentageLoss?: number;
  isGoalAchieved?: boolean
}

export interface PlayerDebt {
  order?: number;
  player?: PlayerDto;
  totalDebt?: number;
  totalPaid?: number;
}

export interface MessageDto {
  id?: number;
  player?: PlayerDto;
  messageDate?: Date;
  text?: string;
}
