import { randomUUID } from "crypto";
import OrderCreateDTO from "../dto/order-create.dto";
import OrderFactory from "./order.factory";

describe("Orrder factory unit tests", () => {
  it("should create an order", () => {
    const orderProps = {
      customerId: randomUUID(),
      items: [
        {
          id: randomUUID(),
          name: "TV 50 pol samsung",
          price: 2500,
          productId: randomUUID(),
          quantity: 1
        },
        {
          id: randomUUID(),
          name: "Notebook Dell",
          price: 2890,
          productId: randomUUID(),
          quantity: 3
        }
      ]
    } as OrderCreateDTO

    const order = OrderFactory.create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toBe(orderProps.customerId);
    expect(order.items.length).toBe(2);
  })
});