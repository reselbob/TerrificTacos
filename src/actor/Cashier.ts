import {logger} from "../logger"
import {ISignal} from "../model/ISignal";
import {Actor} from "./Actor";

export class Cashier extends Actor{
    // @ts-ignore
    process(signal: ISignal): void {
        logger.info(`I am the ${Cashier.name} and I processing payment for the order ${signal.order.id}.`)

        let newSignal: ISignal = {
            id: null,
            timeStamp: null,
            name: "paymentCompleted",
            order: signal.order,
            restaurant: signal.restaurant
        }

        this.signal(newSignal);

    }

}
