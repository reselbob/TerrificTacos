import {Order} from "./Order";
import {Restaurant} from "../Restaurant";

export interface ISignal {
    timeStamp: Date | null;
    name: string;
    restaurant: string;
    order: Order;
}
