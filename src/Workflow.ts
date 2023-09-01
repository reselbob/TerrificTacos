import {ISignal} from "./model/ISignal";
import {logger} from "./logger"

export class Workflow{
    public static process(signal : ISignal) : void {
        switch(signal.name.toUpperCase()){
            case "ORDERSUBMITTED":
                this.orderSubmittedHandler(signal);
                break;
            case "ORDERSTARTED":
                this.orderStartedHandler(signal);
                break;
            case "ORDERREADY":
                this.orderReadyHandler(signal);
                break;
            case "ORDERSERVED":
               this.orderServedHandler(signal);
                break;
            case "PAYMENTSTARTED":
                this.paymentStartedHandler(signal);
                break;
            case "PAYMENTCOMPLETE":
                this.paymentCompletedHandler(signal)
                break;

        }
    }

    private static orderSubmittedHandler(signal : ISignal) : void {
         logger.info(JSON.stringify({signalName: signal.name}));
    }

    private static orderStartedHandler(signal : ISignal) : void {
         logger.info(JSON.stringify({signalName: signal.name}));
    }

    private static orderReadyHandler(signal : ISignal) : void {
         logger.info(JSON.stringify({signalName: signal.name}));
    }

    private static orderServedHandler(signal : ISignal) : void {
         logger.info(JSON.stringify({signalName: signal.name}));
    }

    private static paymentStartedHandler(signal : ISignal) : void {
         logger.info(JSON.stringify({signalName: signal.name}));
    }

    private static paymentCompletedHandler(signal : ISignal) : void {
         logger.info(JSON.stringify({signalName: signal.name}));
    }

}
