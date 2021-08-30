export interface User {
    id?: number; // PK
    userEmail: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    preferredGameId?: number; // Current/ preferred game
    userGender?: string;
    dateOfBirth?: Date;
    phoneNumber?: string;
    streetAddress?: string;
    city?: string;
    province?: string;
    postalCode?: string;
    country?: string;
    userHeight?: number;
    userBio?: string;
    userPhoto?: string; // to be developed
}