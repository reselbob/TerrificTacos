import * as dotenv from 'dotenv';
import {logger} from "./logger"
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {Workflow} from "./Workflow";
import {ISignal} from "./model/ISignal";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";

dotenv.config();

const app: Express = express();
const port = process.env.MESSAGE_TARGET_PORT;

app.use(bodyParser.json());

app.post('/signal', (req: Request, res: Response) => {
    const signal = req.body;
    if(signal.timeStamp === null) signal.timeStamp = new Date();
    if(signal.id === null) signal.id = uuidv4();
    persistSignal(signal);
    Workflow.process(signal);
    res.status(200).json({ message: 'Data received successfully', data: signal });
});

app.listen(port, () => {
    logger.info(`Server is listening on port ${port}`);
});

function persistSignal(signal: ISignal): void {
    const eventsFileSpec = path.join(__dirname, '..', 'data',"events.log");
    fs.appendFile(eventsFileSpec, `${JSON.stringify(signal)}\n`, (err) => {
        if (err) {
            logger.error('Error appending to file:', err);
        } else {
            logger.info('JSON event appended to events.log');
        }
    });
}

export default app;

