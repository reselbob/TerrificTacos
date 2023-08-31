import {logger} from "./logger"
import {Restaurant} from "./Restaurant";
import {RestaurantListener} from "./RestaurantListener";
import {Randomizer} from "./helper/Randomizer";
import {Payment} from "./model/Payment";

logger.info("Starting the restaurant workflow");

const restaurant = new Restaurant("Tommy's Tacos")

const restaurantListener = new RestaurantListener(restaurant);

runOrderWorkflow();

function runOrderWorkflow() {
    const customer = Randomizer.getCustomer();

    const order = Randomizer.getOrder(customer, 4);

    let total = 0;

    order.orderItems.forEach(item => {
        total += item.total;
    })

    restaurant.order(order);
    restaurant.prepare(order);
    restaurant.serve(order);

    order.payment = new Payment(Randomizer.getCreditCard(customer), total)
    restaurant.pay(order);
}



