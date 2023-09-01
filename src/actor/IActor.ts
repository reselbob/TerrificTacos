import {ISignal} from "../model/ISignal";
import * as url from "url";

export interface IActor{
    process: (signal: ISignal) => void;
    signal: (signal: ISignal, targetUrl : string) => void;
}
