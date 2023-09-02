import {ISignal} from "./model/ISignal";
import {logger} from "./logger"
import {Cook} from "./actor/Cook";
import {Waiter} from "./actor/Waiter";
import {Cashier} from "./actor/Cashier";

export class Workflow {
    public static process(signal: ISignal): void {
        switch (signal.name.toUpperCase()) {
            case "ORDERSUBMITTED":
                this.orderSubmittedHandler(signal);
                break;
            case "ORDERSTARTED":
                this.orderStartedHandler(signal);
                break;
            case "ORDERREADY":
                this.orderReadyHandler(signal);
                break;
            case "ORDERSERVED":
                this.orderServedHandler(signal);
                break;
            case "PAYMENTSTARTED":
                this.paymentStartedHandler(signal);
                break;
            case "PAYMENTCOMPLETED":
                this.paymentCompletedHandler(signal)
                break;

        }
    }

    private static orderSubmittedHandler(signal: ISignal): void {
        const cook = new Cook();
        cook.process(signal);
    }

    private static orderStartedHandler(signal: ISignal): void {
        logger.info(`The order ${JSON.stringify(signal.order)} as started to be be made.`);
    }

    private static orderReadyHandler(signal: ISignal): void {
        logger.info(JSON.stringify({signalName: signal.name}));
        const waiter = new Waiter();
        waiter.process(signal);
    }

    private static orderServedHandler(signal: ISignal): void {
        logger.info(`The order ${JSON.stringify(signal.order)} has been served.`);
    }

    private static paymentStartedHandler(signal: ISignal): void {
        const cashier = new Cashier();
        cashier.process(signal);
    }

    private static paymentCompletedHandler(signal: ISignal): void {
        logger.info(`The customer ${JSON.stringify(signal.order.customer)} has paid. The customer is free to leave ${signal.restaurant}`);
    }

}
