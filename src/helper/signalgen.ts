import {Randomizer} from "./Randomizer";

/**
 * This file created a orderSubmitted signal with random value.
 *
 * You can copy and paste the output to execute a curl command against
 * the webserver. (Make sure the webserver is running.)
 */

const str = JSON.stringify(Randomizer.getRandomOrderSubmittedSignal(4, "Terrific Tacos"));

const curl = `curl -X POST -H "Content-Type: application/json" -d '${str}' http://localhost:3000/signal`

console.log(curl);
