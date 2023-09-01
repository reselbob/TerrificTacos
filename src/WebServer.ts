import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {Workflow} from "./Workflow";
import {ISignal} from "./model/ISignal";
import path from "path";
import fs from "fs";

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/signal', (req: Request, res: Response) => {
    const signal = req.body;
    signal.timeStamp = new Date();
    persistSignal(signal);
    Workflow.process(signal);
    res.status(200).json({ message: 'Data received successfully', data: signal });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

function persistSignal(signal: ISignal): void {
    const eventsFileSpec = path.join(__dirname, '..', 'data',"events.log");
    fs.appendFile(eventsFileSpec, `${JSON.stringify(signal)}\n`, (err) => {
        if (err) {
            console.error('Error appending to file:', err);
        } else {
            console.log('JSON event appended to events.log');
        }
    });
}

export default app;

