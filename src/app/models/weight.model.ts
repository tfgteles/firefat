import { Member } from './member.model';
import { WeightDate } from './weightdate.model';

export interface Weight {
    id?: number;
    member: Member; // Related member
    weightDate: WeightDate; // Related date
    scaleImage?: string; // to be developed
    weightMeasure: number;
}
