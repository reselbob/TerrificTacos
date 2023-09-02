import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/WebServer';
import {Randomizer} from "../src/helper/Randomizer";
import {ISignal} from "../src/model/ISignal";

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/data', () => {
    it('should send a POST request and get a response', async () => {

        const customer = Randomizer.getCustomer();

        const order = Randomizer.getOrder(customer, 1);
        const signal: ISignal = {
            id: null,
            timeStamp: null,
            name: "orderSubmitted",
            order: order,
            restaurant: "Tommy's Taco"
        }
        const requestData = signal;

        const res = await chai.request(app)
            .post('/signal')
            .send(requestData);

        expect(res).to.have.status(200);
    });
});
