import {OrderItem} from "./OrderItem";
import {Customer} from "./Customer";
import {Payment} from "./Payment";
import { v4 as uuidv4 } from 'uuid';

export class Order {
    public readonly orderItems: OrderItem[]
    public readonly customer: Customer;
    public id: string;
    // @ts-ignore
    private _payment: Payment;

    constructor(customer: Customer) {
        this.orderItems = new Array<OrderItem>()
        this.customer = customer;
        this.id = uuidv4();
    }

    public add(orderItem: OrderItem): void {
        this.orderItems.push(orderItem);
    }

    public get payment(): Payment {
        return this._payment;
    }

    public set payment(value: Payment) {
        this._payment = value;
    }
}
