import {Order} from "./Order";
import {Restaurant} from "../Restaurant";

export interface IEvent {
    timeStamp: Date | null;
    name: string;
    restaurant: Restaurant;
    order: Order;
}
