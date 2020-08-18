import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GameDataService {
  public gameId;
  public gameParticipants;
  public gameWeights;
  public gamePayments;
  public gameDates;
  constructor() {}
}
