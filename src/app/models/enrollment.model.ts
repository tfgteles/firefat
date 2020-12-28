export interface Enrollment {
    enrollmentId: string;
    gameId: string;
    playerId: string;
    weightGoal: number;
    vacationStart: string; // dateId from FireFatSchedule
    playerPrivilege: string; // null, standard, admin
}