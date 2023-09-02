import {OrderItem} from "./OrderItem";
import {Customer} from "./Customer";
import {CreditCard} from "./CreditCard";
import { v4 as uuidv4 } from 'uuid';

export class Order {
    public readonly orderItems: OrderItem[]
    public readonly customer: Customer;
    public id: string;
    public readonly creditCard: CreditCard;

    constructor(customer: Customer, creditCard: CreditCard) {
        this.orderItems = new Array<OrderItem>()
        this.customer = customer;
        this.creditCard = creditCard;
        this.id = uuidv4();
    }

    public add(orderItem: OrderItem): void {
        this.orderItems.push(orderItem);
    }
}
