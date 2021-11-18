import { Game } from "./game.model";

export interface UserProfile {
    id?: number; // PK
    userEmail: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    preferredGameId?: number; // Current/ preferred game
    userGender?: string;
    dateOfBirth?: Date | string;
    phoneNumber?: string;
    streetAddress?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
    userHeight?: number;
    userBio?: string;
    userPhoto?: string; // to be developed
    isAppAdmin?: boolean;
    membership?: Game[];
}
