import {v4 as uuidv4} from 'uuid';
import {Randomizer} from "./helper/Randomizer";
import {WorkflowController} from "./WorkflowController";
import {IWorkflowConfig} from "./model/IWorkflowConfig";


async function main() {
    let customer = Randomizer.getCustomer();

// make a workflow for restaurant Terrific Taco Number 1
    let config: IWorkflowConfig = {
        workflowId: uuidv4(),
        order: Randomizer.getOrder(customer, 2),
        customer: Randomizer.getCustomer(),
        restaurant: "Terrific Taco Number 1"
    }

    let controller = new WorkflowController(config);
    await controller.run();


// make a workflow for restaurant Terrific Taco Number 2
    config = {
        workflowId: uuidv4(),
        order: Randomizer.getOrder(customer, 3),
        customer: Randomizer.getCustomer(),
        restaurant: "Terrific Taco Number 2"
    }

    controller = new WorkflowController(config);
    await controller.run();


// make a workflow for restaurant Terrific Taco Number 3
    config = {
        workflowId: uuidv4(),
        order: Randomizer.getOrder(customer, 1),
        customer: Randomizer.getCustomer(),
        restaurant: "Terrific Taco Number 3"
    }

    controller = new WorkflowController(config);
    await controller.run();
}

main();
