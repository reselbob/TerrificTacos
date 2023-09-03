import path from "path";
import * as dotenv from "dotenv";
import axios from "axios";
import {Order} from "./model/Order";
import {IWorkflowConfig} from "./model/IWorkflowConfig";
import {ISignal} from "./model/ISignal";

/**
 * This class passes signals onto the WebServer
 * create signals using data provided by the IWorkflowConfig
 * parameter of the class's constructor
 */
export class WorkflowController{
    private readonly targetUrl: string;
    private readonly order: Order;
    private readonly workflowId: string;
    private readonly restaurant: string;
    constructor(config: IWorkflowConfig){
        if (! this.validateJsonObject(config)){
            throw new Error("Invalid configuration object")
        }
        const d = path.join(__dirname, '.env');
        dotenv.config({path: d});
        const port = process.env.MESSAGE_TARGET_PORT;
        const domain = process.env.MESSAGE_TARGET_DOMAIN;
        const endpoint = process.env.MESSAGE_TARGET_ENDPOINT
        this.targetUrl = `${domain}:${port}/${endpoint}`

        this.order = config.order;
        this.workflowId = config.workflowId;
        this.restaurant = config.restaurant;
    }

    public async run(): Promise<void> {
        let nextSignal: ISignal = {
            id: null,
            name: "orderSubmitted",
            timeStamp: null,
            order: this.order,
            restaurant: this.restaurant
        }

        let response = await axios.post(this.targetUrl, nextSignal);
        while (response.data.nextSignal.name !== 'orderClosed') {
            response = await axios.post(this.targetUrl, response.data.nextSignal);
        }
    }

    private validateJsonObject(obj: Partial<IWorkflowConfig>): boolean {
        const keys: (keyof IWorkflowConfig)[] = ['workflowId', 'order', 'restaurant'];
        // Check if all required keys are present
        for (const key of keys) {
            if (!(key in obj)) {
                return false;
            }
        }

        // Check if all values are not null
        for (const key of keys) {
            if (obj[key] === null) {
                return false;
            }
        }

        return true;
    }
}

