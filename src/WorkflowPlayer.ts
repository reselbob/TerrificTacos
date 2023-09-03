import * as readline from 'readline';
import * as fs from 'fs';
import path from "path";
import {ISignal} from "./model/ISignal";
import {Workflow} from "./Workflow";

/**
 * This file replays the workflow according to the signals
 * stored in the file defined by signalsFileSpec
 */

// get the signal log, convert so signal and add to array
const signals: Array<ISignal> = new Array<ISignal>();
const signalsFileSpec = path.join(__dirname, '..', 'data',"signals.log");

// Create a readable stream for the file
const fileStream = fs.createReadStream(signalsFileSpec);

// Create an interface for reading lines
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity // Detect line endings automatically
});

// Read the data stored in the in the file defined by signalsFileSpec
rl.on('line', (line) => {
    try {
        // Parse each line as a JSON object and push it to the array
        const jsonObject = JSON.parse(line);
        signals.push(jsonObject);
    } catch (error) {
        console.error(`Error parsing JSON: ${error}`);
    }
});

// Event handler for when the file has been fully read
rl.on('close', () => {
    signals.forEach(signal => {
        Workflow.process(signal);
    })
});
