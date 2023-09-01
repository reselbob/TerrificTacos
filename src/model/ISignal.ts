import {Order} from "./Order";

export interface ISignal {
    id: string | null;
    timeStamp: Date | null;
    name: string;
    restaurant: string;
    order: Order;
}
