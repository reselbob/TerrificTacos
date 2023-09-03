import {v4 as uuidv4} from 'uuid';
import {Randomizer} from "./helper/Randomizer";
import {WorkflowController} from "./WorkflowController";
import {IWorkflowConfig} from "./model/IWorkflowConfig";

/**
 * The file creates 3 orders 3 orders, submitting each to a distinct
 * workflow by way of an HTTP POST request to the WebServer.
 * Each order is dedicated to a specific customer created at random.
 * Also, each order is dedicated to a specific store that is part of
 * the restaurant chain.
 */
async function main() {
// make a workflow for restaurant Terrific Taco Number 1
    const order = Randomizer.getOrder(Randomizer.getCustomer(), 2)
    let config: IWorkflowConfig = {
        workflowId: uuidv4(),
        order: order,
        restaurant: "Terrific Taco Number 1"
    }
    let controller = new WorkflowController(config);
    await controller.run();

// make a workflow for restaurant Terrific Taco Number 2
    config = {
        workflowId: uuidv4(),
        order: Randomizer.getOrder(Randomizer.getCustomer(), 3),
        restaurant: "Terrific Taco Number 2"
    }
    controller = new WorkflowController(config);
    await controller.run();

// make a workflow for restaurant Terrific Taco Number 3
    config = {
        workflowId: uuidv4(),
        order: Randomizer.getOrder(Randomizer.getCustomer(), 1),
        restaurant: "Terrific Taco Number 3"
    }

    controller = new WorkflowController(config);
    await controller.run();
}

main();
