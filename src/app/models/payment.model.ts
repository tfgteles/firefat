import { Member } from "./member.model";

export interface Payment {
    id?: number;
    memberId?: number; // Payee
    member?: Member;
    receiptImage?: string; // to be developed
    paymentDate?: Date;
    amountPaid: number;
}
