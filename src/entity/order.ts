import OrderItem from "./order-item";

export default class Order {
  private id: string;
  private customerId: string;
  private items: OrderItem[];

  constructor(id: string, customerId: string, item: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.items = item;
  }

  total(): number {
    return this.items.reduce((aac, item) => aac + item.getPrice() , 0)
  }
}