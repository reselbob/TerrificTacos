# Terrific Tacos
A project, written in TypeScript, demonstrates the concepts behind event sourcing. 

# Install the packages

```bash
npm install
```

# Running the project

To run the bash script that executes all aspects of the Event Sourcing demonstration, execute the following command:

```bash
sh runScenario.sh
```

# Understanding the use case and architecture

The use case that this project emulates is one in which a restaurant chain processes orders for each unit in a centralized manner.

The sequence of steps in the order process is:

- `orderSubmitted`
- `orderStarted`
- `orderReady`
- `orderServed`
- `paymentStarted`
- `paymentComplete`
- `orderClosed`

The illustration below describes the architecture and the signal dynamics.

![Architecture](./images/eventsourcing-arch-01.png)

A [signal](./src/model/ISignal.ts) that describes an [Order](./src/model/Order.ts) is passed to a component called a [WorkflowController](./src/WorkflowController.ts). The signal has a property called `name` which indicates the step to which the signal applies.

The WorkflowController passes the signal onto the system's [WebServer](./src/WebServer.ts). The WebServer passes the signal on to a component called a [Workflow](./src/Workflow.ts). The Workflow processes the Workflow steps according to the `name` property of the signal. The following is an example of the signal that starts the Workflow process. Notice that the value of the `name` property of the signal is `orderSubmitted`.


```json
{
    "id": null,
        "name": "orderSubmitted",
        "timeStamp": null,
        "order": {
        "orderItems": [
            {
                "description": "Cheese Quesadilla",
                "price": 6.99,
                "quantity": 7
            },
            {
                "description": "Breakfast Burrito",
                "price": 9.99,
                "quantity": 3
            }
        ],
            "customer": {
            "firstName": "Eriberto",
                "lastName": "Runte",
                "email": "Eriberto.Runte@email.com"
        },
        "creditCard": {
            "firstName": "Eriberto",
                "lastName": "Runte",
                "number": "4541511651043665"
        },
        "id": "d86f3d21-c14e-4fd6-9253-fd13f6b0bb29"
    },
    "restaurant": "Terrific Taco Number 1"
}
```

The [Workflow](./src/Workflow.ts) has a set of [handler functions](https://github.com/reselbob/TerrificTacos/blob/ba8303b83f4ccdf806b1a766e5069b46f7bafa7d/src/Workflow.ts#L5) that correspond to the various signals. A handler function takes a signal as a parameter. When a handler completes is processing, it returns the next signal to be used in the workflow process. This is very similar to the use of  [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) (Hypertext as the Engine of Application State) in a RESTful API, in that the `nextSignal` response makes the workflow self-describing in terms of how the workflow progresses.

The returned `nextSignal` is then returned by the WebController to the WebServer. The WebServer returns the `nextSignal` to the calling request as an HTTP response. The `nextSignal` can then be resubmitted to the WebServer to continue the logic of the workflow process.

The [RestaurantManager](./src/RestaurantManager.ts) component does the work of creating 3 orders, submitting each to a distinct workflow by way of an HTTP POST request to the WebServer. Each order is dedicated to a specific customer created at random. Also, each order is dedicated to a specific store that is part of the restaurant chain.

# Supporting event sourcing

As mentioned at the beginning of this readme, the purpose of the use case is to demonstrate [event sourcing](https://en.wikipedia.org/wiki/Domain-driven_design#Event_sourcing). Thus, this project is dividing into two parts. The first part is the one described above which has to do with executing the use case process using the WebServer, WorkflowController and Workflow.

The second part pertains to replaying the signals (a.k.a *events*) that instigate the various steps in the workflow. Replay is a core feature for systems that use event sourcing. In a system that supports event sourcing, events are stored in some sort of data storage mechanism. That data represents the state of the system over its lifetime and at any point in the system's operation.

Signal replay is conducted by the [WorkflowPlayer](/src/WorkflowPlayer.ts). The WorkflowPlayer retrieves the signals that have been recorded and stored by the WebServer in a file named `signals.log`. The file `signals.log` is in the `./data` directory which is created on the fly when the WebServer starts receiving signals. (The WebServer is the sole component that does the work of storing signal data in the `signals.log` file.)

The WorkflowPlayer component retrieves the data stored in the `signals.log` file. The WorkflowPlayer then parses the data in the file into signals. These signals are then submitted to the `Workflow` component. Submitting the signals to the `Workflow` replicates the `Workflow`s behavior.

# Be advised

This project is a very simple demonstration of essentials of event sourcing. Production grade support for event sourcing is technologically complex. This project does not address any of the complexities such as coordinating replay behavior with ongoing signal storage and processing. Also, the project does not address the complexities of supporting concurrency when millions of workflows are executing.

Typically, systems that support event sourcing at a production level use some type of message broker as well as a framework to support concurrency. Good examples of production grade technologies that support event sourcing at scale are [Temporal](https://docs.temporal.io/) and [Akka](https://doc.akka.io/docs/akka/current/typed/persistence.html) for Java and Scala.


