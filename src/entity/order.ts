import OrderItem from "./order-item";

export default class Order {
  private id: string;
  private customerId: string;
  private items: OrderItem[];

  constructor(id: string, customerId: string, item: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = item;
    this.validate();
  }

  validate() {
    if (this.id.length === 0) {
      throw new Error("Id is required");
    }

    if (this.customerId.length === 0) {
      throw new Error("CustomerId is required");
    }

    if (this.items.length === 0) {
      throw new Error("Item qtd must be greater than zero");
    }
}

  total(): number {
    return this.items.reduce((aac, item) => aac + item.getPrice() , 0)
  }
}