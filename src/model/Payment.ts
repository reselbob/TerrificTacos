import {CreditCard} from "./CreditCard";


export class Payment {
    constructor(readonly creditcard: CreditCard, readonly amount: number ) {
    }
}
