import {CreditCard} from "./CreditCard";


export class Payment {
    constructor(readonly creditCard: CreditCard, readonly amount: number ) {
    }
}
