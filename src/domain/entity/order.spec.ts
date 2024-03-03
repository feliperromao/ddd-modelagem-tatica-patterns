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
    const item1 = new OrderItem("1", "Ventilador", 300, "p1", 2)
    const item2 = new OrderItem("2", "TV Samsung 40", 2000, "p2", 3)
    const item3 = new OrderItem("3", "Laptop Asus", 3500, "p3", 1)
    const order = new Order("1", "123", [item1, item2, item3])
    expect(order.total()).toEqual((300*2) + (2000*3) + 3500)
  });

  it("should check if the quantity is greater than zero", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0)
      const order = new Order("o1", "c1", [item])
    }).toThrowError("quantity must be greater than zero");
  });
})