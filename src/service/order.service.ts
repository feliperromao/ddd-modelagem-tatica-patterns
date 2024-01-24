import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";

export default class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]):  Order{
    if(items.length ===0) {
      throw new Error("order must have at least one item")
    }

    const order = new Order("o1", customer.getId(), items)
    customer.addRewardPoints(order.total()/2)
    return order
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0)
  }
}