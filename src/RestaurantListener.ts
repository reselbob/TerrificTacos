import {Restaurant} from "./Restaurant";
import {Order} from "./model/Order";
import {logger} from "./logger"
import {Payment} from "./model/Payment";


export class RestaurantListener {
    constructor(restaurant: Restaurant) {
        const orderTakenHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} took order ${JSON.stringify(order)}`);
        }

        const prepareHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} prepared order ${JSON.stringify(order)}`);
        }

        const serveHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} served  order ${JSON.stringify(order)}`);
        }

        const payHandler = (s: Restaurant, order: Order) => {
            logger.info(`${s.name} had the order paid as follows ${JSON.stringify(order)}.`);
        }

        restaurant.OrderTakenEvent.on(orderTakenHandler);
        restaurant.PrepareEvent.on(prepareHandler);
        restaurant.ServeEvent.on(serveHandler);
        restaurant.PayEvent.on(payHandler);
    }
}
