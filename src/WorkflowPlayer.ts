import * as readline from 'readline';
import * as fs from 'fs';
import path from "path";
import {ISignal} from "./model/ISignal";
import {Workflow} from "./Workflow";

// get the event log, convert so signal and add to array

const events: Array<ISignal> = new Array<ISignal>();

const eventsFileSpec = path.join(__dirname, '..', 'data',"events.log");

// Create a readable stream for the file
const fileStream = fs.createReadStream(eventsFileSpec);

// Create an interface for reading lines
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // Detect line endings automatically
});

const jsonObjects: any[] = [];

// Event handler for each line read from the file
rl.on('line', (line) => {
    try {
        // Parse each line as a JSON object and push it to the array
        const jsonObject = JSON.parse(line);
        events.push(jsonObject);
    } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
    }
});

// Event handler for when the file has been fully read
rl.on('close', () => {
    events.forEach(event => {
        Workflow.process(event);
    })
});
