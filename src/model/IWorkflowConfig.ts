import {Order} from "./Order";
import {Customer} from "./Customer";

export interface IWorkflowConfig {
    workflowId: string;
    order: Order;
    customer: Customer;
    restaurant: string;
}
