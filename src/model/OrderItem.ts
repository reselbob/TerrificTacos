import {Customer} from "./Customer";

export class OrderItem {
    public total: number;
    constructor(readonly description: string, readonly price: number, readonly  quantity: number) {
        this.total = this.price * this.quantity;
    }
}
