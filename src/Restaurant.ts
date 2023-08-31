import {Signal} from "./Signal"
import {Order} from "./model/Order";

export class Restaurant {
    private readonly onOrderTaken = new Signal<Restaurant, Order>();
    private readonly onPrepared = new Signal<Restaurant, Order>();
    private readonly onServed = new Signal<Restaurant, Order>();
    private readonly onPaid = new Signal<Restaurant, Order>();

    constructor(readonly name: string) {}

    public get OrderTakenEvent(): Signal<Restaurant, Order> {
        return this.onOrderTaken;
    }

    public get PrepareEvent(): Signal<Restaurant, Order> {
        return this.onPrepared;
    }

    public get ServeEvent(): Signal<Restaurant, Order> {
        return this.onServed;
    }

    public get PayEvent(): Signal<Restaurant, Order> {
        return this.onPaid;
    }

    public order(order: Order ) {
        this.onOrderTaken.trigger(this, order);
    }

    public prepare(order: Order ) {
        this.onPrepared.trigger(this, order);
    }

    public serve(order: Order ) {
        this.onServed.trigger(this, order);
    }

    public pay(order: Order ) {
     if(order.payment === null) throw new Error("No payment indicated for order")

        this.onPaid.trigger(this, order);
    }
}
