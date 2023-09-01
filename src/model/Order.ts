import {OrderItem} from "./OrderItem";
import {Customer} from "./Customer";
import {Payment} from "./Payment";
import { v4 as uuidv4 } from 'uuid';

export class Order {
    private readonly _orderItems: OrderItem[]
    private readonly _customer: Customer;
    private readonly _id: string;
    // @ts-ignore
    private _payment: Payment;


    constructor(customer: Customer) {
        this._orderItems = new Array<OrderItem>()
        this._customer = customer;
        this._id = uuidv4();
    }

    public add(orderItem: OrderItem): void {
        this._orderItems.push(orderItem);
    }


    get id(): string {
        return this._id;
    }

    public get orderItems(): OrderItem[] {
        return this._orderItems;
    }
    public get customer(): Customer {
        return this._customer;
    }

    public get payment(): Payment {
        return this._payment;
    }

    public set payment(value: Payment) {
        this._payment = value;
    }
}
