import {logger} from "../logger"
import {ISignal} from "../model/ISignal";
import {Actor} from "./Actor";
import {CreditCard} from "../model/CreditCard";
import {Randomizer} from "../helper/Randomizer";
import {Payment} from "../model/Payment";

export class Waiter extends Actor{
    // @ts-ignore
    process(signal: ISignal): void {
        logger.info(`I am the ${Waiter.name} and I have finished serving the order ${signal.order.id}.`)

        // If the signal is orderReader, then send a new signal telling an interested party
        // that the order has been served
        let newSignal: ISignal = {
            id: null,
            timeStamp: new Date(),
            name: "orderServed",
            order: signal.order,
            restaurant: signal.restaurant
        }

        this.signal(newSignal);

        let grandTotal = 0;
        signal.order.orderItems.forEach(item => {
            grandTotal += item.total;
        })
        const creditCard = Randomizer.getCreditCard(signal.order.customer);
        const payment = new Payment(creditCard,grandTotal);

        logger.info(`I am the ${Waiter.name} I am attaching payment to the order ${signal.order.id}.`)

        const adjustedOrder = signal.order;
        adjustedOrder.payment = payment;
        newSignal = {
            id: null,
            timeStamp: null,
            name: "paymentStarted",
            order: adjustedOrder,
            restaurant: signal.restaurant
        }

        this.signal(newSignal);

    }

}
