import {Customer} from "./Customer";

export class OrderItem {
    constructor(readonly description: string, readonly price: number, readonly  quantity: number) {}

    get total(): number {
        return this.price * this.quantity;
    }
}
