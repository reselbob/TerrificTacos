import {Restaurant} from "./Restaurant";
import {Order} from "./model/Order";
import {logger} from "./logger"
import {IEvent} from "./model/IEvent";
import fs from 'fs';
import * as path from "path";

export class RestaurantListener {
    constructor(restaurant: Restaurant) {
        const orderTakenHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} took order ${JSON.stringify(order)}`);
            const event: IEvent = {
                timeStamp: new Date(),
                name: "orderTaken",
                restaurant: s,
                order: order
            }

            const str = JSON.stringify(event)
            this.addToEventStream(str);
        }

        const prepareHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} prepared order ${JSON.stringify(order)}`);
            const event: IEvent = {
                timeStamp: new Date(),
                name: "prepare",
                restaurant: s,
                order: order
            }

            const str = JSON.stringify(event)
            this.addToEventStream(str);
        }

        const serveHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} served  order ${JSON.stringify(order)}`);
            const event: IEvent = {
                timeStamp: new Date(),
                name: "serve",
                restaurant: s,
                order: order
            }

            const str = JSON.stringify(event)
            this.addToEventStream(str);
        }

        const payHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} had the order paid as follows ${JSON.stringify(order)}.`);
            const event: IEvent = {
                timeStamp: new Date(),
                name: "pay",
                restaurant: s,
                order: order
            }

            const str = JSON.stringify(event)
            this.addToEventStream(str);
        }

        restaurant.OrderTakenEvent.on(orderTakenHandler);
        restaurant.PrepareEvent.on(prepareHandler);
        restaurant.ServeEvent.on(serveHandler);
        restaurant.PayEvent.on(payHandler);
    }

    addToEventStream(jsonString: string) {
        const eventsFileSpec = path.join(__dirname, '..', 'data',"events.log");
        fs.appendFile(eventsFileSpec, `${jsonString}\n`, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
            } else {
                console.log('JSON event appended to events.log');
            }
        });
    }
}
