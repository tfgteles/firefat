import { Member } from "./member.model";
import { WeightDate } from "./weight-date.model";

export interface Weight {
    id?: number;
    groupMemberId: number; // Related member - memberId
    dateId: number; // Related date - weightDateId
    scaleImage?: string; // to be developed
    weightMeasure: number;
}
