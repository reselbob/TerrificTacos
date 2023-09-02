import {ISignal} from "./model/ISignal";
import {logger} from "./logger"
import {Randomizer} from "./helper/Randomizer";
import {Payment} from "./model/Payment";
import {OrderItem} from "./model/OrderItem";

export class Workflow {
    public static process(signal: ISignal): any {
        switch (signal.name.toUpperCase()) {
            case "ORDERSUBMITTED":
                return this.orderSubmittedHandler(signal);
            case "ORDERSTARTED":
                return this.orderStartedHandler(signal);
            case "ORDERREADY":
                return this.orderReadyHandler(signal);
            case "ORDERSERVED":
                return this.orderServedHandler(signal);
            case "PAYMENTSTARTED":
                return this.paymentStartedHandler(signal);
            case "PAYMENTCOMPLETED":
                return this.paymentCompletedHandler(signal)
            case "ORDERCLOSED":
                return this.orderClosedHandler(signal)
        }
    }

    private static orderSubmittedHandler(signal: ISignal): ISignal {
        logger.info(`Order ${signal.order.id} for restaurant ${signal.restaurant} has been submitted.`)
        // return the next signal
        return {
            id: null,
            name: "orderStarted",
            timeStamp: null,
            order: signal.order,
            restaurant: signal.restaurant
        };
    }

    private static orderStartedHandler(signal: ISignal): ISignal {
        logger.info(`Order ${signal.order.id} for restaurant ${signal.restaurant} has started to be made.`)
        return {
            id: null,
            name: "orderReady",
            timeStamp: null,
            order: signal.order,
            restaurant: signal.restaurant
        };
    }

    private static orderReadyHandler(signal: ISignal): ISignal {
        logger.info(`Order ${signal.order.id} for restaurant ${signal.restaurant} is ready.`)
        return {
            id: null,
            name: "orderServed",
            timeStamp: null,
            order: signal.order,
            restaurant: signal.restaurant
        };
    }

    private static orderServedHandler(signal: ISignal): ISignal {
        logger.info(`The order ${JSON.stringify(signal.order)} for restaurant ${signal.restaurant} has been served.`);
        return {
            id: null,
            name: "paymentStarted",
            timeStamp: null,
            order: signal.order,
            restaurant: signal.restaurant
        };
    }

    private static paymentStartedHandler(signal: ISignal): ISignal {
        const customer = signal.order.customer;
        const creditCard = Randomizer.getCreditCard(customer);
        logger.info(`The order ${JSON.stringify(signal.order)} for restaurant ${signal.restaurant} has started payment process using credit card ${JSON.stringify(creditCard)}.`);

        let grandTotal = 0;
        signal.order.orderItems.forEach(item => {
            //convert the item for a formal OrderItem to pick up the total logic
            const orderItem = new OrderItem(item.description, item.price, item.quantity)
            grandTotal += orderItem.total;
        })

        const payment = new Payment(creditCard, grandTotal);

        const adjustedOrder = signal.order;
        adjustedOrder.payment = payment;
        return {
            id: null,
            timeStamp: null,
            name: "paymentCompleted",
            order: adjustedOrder,
            restaurant: signal.restaurant
        };
    }

    private static paymentCompletedHandler(signal: ISignal): ISignal {
        logger.info(`The customer ${JSON.stringify(signal.order.customer)} has paid. The customer is free to leave ${signal.restaurant}`);
        return {
            id: null,
            name: "orderClosed",
            timeStamp: null,
            order: signal.order,
            restaurant: signal.restaurant
        };
    }

    private static orderClosedHandler(signal: ISignal): ISignal {
        logger.info("Order closed.");
        // Yes, this is no-op because this handler will never be called
        return {
            id: null,
            name: "orderClosed",
            timeStamp: null,
            order: signal.order,
            restaurant: signal.restaurant
        };
    }

}
