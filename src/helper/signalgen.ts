import {Randomizer} from "./Randomizer";

const str = JSON.stringify(Randomizer.getRandomOrderSubmittedSignal(4, "Cool Restaurant"));

const curl = `curl -X POST -H "Content-Type: application/json" -d '${str}' http://localhost:3000/signal`

console.log(curl);
