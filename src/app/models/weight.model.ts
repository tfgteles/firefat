import { Member } from "./member.model";
import { WeightDate } from "./weight-date.model";

export interface Weight {
    id?: number;
    memberId: number; // Related member
    member?: Member;
    weightDateId: number; // Related date
    weightDate: WeightDate;
    scaleImage?: string; // to be developed
    weightMeasure: number;
}
