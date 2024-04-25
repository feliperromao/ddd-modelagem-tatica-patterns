import { randomUUID } from "crypto";
import OrderCreateDTO from "../dto/order-create.dto";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";

export default class OrderFactory {
  public static create(orderProps: OrderCreateDTO): Order {
    const items = orderProps.items.map(item => (
      new OrderItem(item.id, item.name, item.price, item.productId, item.quantity)
    ))
    return new Order(
      randomUUID(),
      orderProps.customerId,
      items
    )
  }
}