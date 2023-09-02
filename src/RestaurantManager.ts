import {v4 as uuidv4} from 'uuid';
import {Randomizer} from "./helper/Randomizer";
import {WorkflowController} from "./WorkflowController";
import {IWorkflowConfig} from "./model/IWorkflowConfig";


async function main() {
// make a workflow for restaurant Terrific Taco Number 1
    let config: IWorkflowConfig = {
        workflowId: uuidv4(),
        order: Randomizer.getOrder(Randomizer.getCustomer(), 2),
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
