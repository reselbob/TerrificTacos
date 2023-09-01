import {logger} from "../logger"
import {Actor} from "./Actor";
import {ISignal} from "../model/ISignal";
export class Cook extends Actor{
    // @ts-ignore
    public process(signal: ISignal): void {
        logger.info(`I am the ${Cook.name} and I am starting to processing the order ${signal.order.id}`)

        // If the signal is orderSubmitted, then send a new signal telling an interested party
        // that the order is started
        let newSignal: ISignal = {
            id: null,
            timeStamp: new Date(),
            name: "orderStarted",
            order: signal.order,
            restaurant: signal.restaurant
        }

        this.signal(newSignal);

        logger.info(`I am the ${Cook.name} and I have finished making the order ${signal.order.id}.`)

        newSignal = {
            id: null,
            timeStamp: new Date(),
            name: "orderReady",
            order: signal.order,
            restaurant: signal.restaurant
        }
        this.signal(newSignal);
    }
}
