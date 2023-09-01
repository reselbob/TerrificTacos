import axios from 'axios';
import {IActor} from "./IActor";
import {ISignal} from "../model/ISignal";
import {logger} from "../logger"
import dotenv from 'dotenv';
import path from 'path';

export abstract class Actor implements IActor {
    private readonly port: string | undefined;
    private readonly domain: string | undefined;
    private readonly endpoint: string | undefined;

    constructor() {
        const d = path.join(__dirname, '..', '.env');
        dotenv.config({path: d});
        this.port = process.env.MESSAGE_TARGET_PORT;
        this.domain = process.env.MESSAGE_TARGET_DOMAIN;
        this.endpoint = process.env.MESSAGE_TARGET_ENDPOINT;

    }

    abstract process: (signal: ISignal) => void;

    signal(signal: ISignal): void {
        const targetUrl = `${this.domain}:${this.port}/${this.endpoint}`
        axios.post(targetUrl, signal)
            .then((response) => {
                // Handle the successful response here
                logger.info('Response:', response.data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                logger.error('Error:', error);
            })
    }
}
