import Order from "./order";
import OrderItem from "./order-item";

describe("Order unit test", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", [])
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("1", "", [])
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("1", "123", [])
    }).toThrowError("Item qtd must be greater than zero");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Ventilador", 300)
    const item2 = new OrderItem("2", "TV Samsung 40", 2000)
    const item3 = new OrderItem("3", "Laptop Asus", 3500)
    const order = new Order("1", "123", [item1, item2, item3])
    expect(order.total()).toEqual(300 + 2000 + 3500)
  });
})