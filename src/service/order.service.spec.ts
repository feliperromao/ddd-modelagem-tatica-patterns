import Order from "../entity/order"
import OrderItem from "../entity/order-item"
import OrderService from "./order.service"

describe("Order service unit tests", () => {
  it("should get total of all orders", () => {
    const item1 = new OrderItem("i1", "item 1", 100, "p1", 2)
    const item2 = new OrderItem("i2", "item 2", 150, "p2", 3)
    const item3 = new OrderItem("i3", "item 3", 75, "p3", 1)
    const item4 = new OrderItem("i4", "item 4", 25, "p4", 4)
    const order1 = new Order("o1", "c1", [item1, item2])
    const order2 = new Order("o2", "c2", [item3, item4])
    const total = OrderService.total([order1, order2])
    expect(total).toBe(825)

  })
})