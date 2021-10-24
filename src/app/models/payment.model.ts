import { Member } from "./member.model";

export interface Payment {
    id?: number;
    payeeId?: number; // Payee - memberId
    receiptImage?: string; // to be developed
    paymentDate?: Date | string;
    amountPaid: number;
}
