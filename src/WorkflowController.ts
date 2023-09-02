import path from "path";
import * as dotenv from "dotenv";
import {ISignal} from "./model/ISignal";
import axios from "axios";
import {Randomizer} from "./helper/Randomizer";

const d = path.join(__dirname, '.env');
dotenv.config({path: d});

const port = process.env.MESSAGE_TARGET_PORT;
const domain = process.env.MESSAGE_TARGET_DOMAIN;
const endpoint = process.env.MESSAGE_TARGET_ENDPOINT

const targetUrl = `${domain}:${port}/${endpoint}`
const customer = Randomizer.getCustomer();
const order = Randomizer.getOrder(customer, 1);

async function main() {
    console.log('Starting the Workflow Controller...');

    let nextSignal: ISignal = {
        id: null,
        name: "orderSubmitted",
        timeStamp: null,
        order: order,
        restaurant: "Terrific Tacos"
    }

    let response = await axios.post(targetUrl, nextSignal);
    while(response.data.nextSignal.name !== 'orderClosed'){
        response = await axios.post(targetUrl, response.data.nextSignal);
    }

    console.log('Application finished.');
}


main();

