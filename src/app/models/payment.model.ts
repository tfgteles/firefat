import { Member } from './member.model';

export interface Payment {
    id?: number;
    member: Member; // Payee
    receiptImage?: string; // to be developed
    paymentDate: Date;
    amountPaid: number;
}
