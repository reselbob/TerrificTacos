import {faker} from '@faker-js/faker';
import {Customer} from "../model/Customer";
import {Order} from "../model/Order";
import {CreditCard} from "../model/CreditCard";
import {OrderItem} from "../model/OrderItem";
import {ISignal} from "../model/ISignal";

/**
 * This class is a helper that assigned random value to the properties
 * of the variety of objects used in this project.
 */

export class Randomizer {
    public static getCustomer(): Customer {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = `${firstName}.${lastName}@email.com`;
        return new Customer(firstName, lastName, email)
    }

    public static getOrder(customer: Customer, numberOfItems: number): Order {
        const order  = new Order(customer, Randomizer.getCreditCard(customer));

        for(let i = 0; i < numberOfItems; i++){
            order.add(this.getRandomOrderItem());
        }

        return order;
    }

    public static getCreditCard(customer: Customer): CreditCard {
        return new CreditCard(customer.firstName, customer.lastName, this.generateMockCreditCardNumber())
    }

    public static getOrderItem(): OrderItem {
        return this.getRandomOrderItem();
    }

    public static getRandomOrderSubmittedSignal(numberOfItemsInOrder: number, restaurant: string): ISignal{
        const customer = this.getCustomer();
        const order = this.getOrder(customer, numberOfItemsInOrder);
        const signal: ISignal = {
            id: null,
            timeStamp: null,
            name: "orderSubmitted",
            restaurant: restaurant,
            order: order,
        }

        return signal;
    }

    private static getRandomOrderItem(): OrderItem{
        const randomIndex = Math.floor(Math.random() * this.getOrderItems().length);
        const item = this.getOrderItems()[randomIndex];
        return item;
    }

    private static generateMockCreditCardNumber(): string {
        const prefix = "4"; // Visa card prefix
        const numDigits = 16;

        let cardNumber = prefix;
        for (let i = 1; i < numDigits; i++) {
            cardNumber += Math.floor(Math.random() * 10).toString();
        }

        return cardNumber;
    }

    private static getOrderItems(): Array<OrderItem> {
        const items = new Array<OrderItem>();
        const min = 1;
        const max = 10;

        items.push(new OrderItem("Big Fish Taco", 4.99, this.getRandomNumber(min, max)));
        items.push(new OrderItem("Little Fish Taco", 1.99, this.getRandomNumber(min, max)));
        items.push(new OrderItem("Big Chicken Taco", 4.99, this.getRandomNumber(min, max)));
        items.push(new OrderItem("Breakfast Burrito", 9.99, this.getRandomNumber(min, max)));
        items.push(new OrderItem("Tamale", 3.99, this.getRandomNumber(min, max)));
        items.push(new OrderItem("Cheese Quesadilla", 6.99, this.getRandomNumber(min, max)));

        return items;
    }

    private static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}
