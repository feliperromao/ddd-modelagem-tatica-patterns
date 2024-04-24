import Order from "../../../../../domain/checkout/entity/order";
// import OrderRepositoryInterface from "../../../../domain/repository/order-repository-interface";
import OrderitemsModelSequelize from "../../model/sequelize/order-item.model";
import OrdersModelSequelize from "../../model/sequelize/order.model";

export default class OrderRepository {
  async create(order: Order): Promise<void> {
    await OrdersModelSequelize.create(
      {
        id: order.id,
        customer_id: order.customerId,
        total: order.total(),
        items: order.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        }))
      },
      {
        include: [{ model: OrderitemsModelSequelize }]
      }
    )
  }

  find(id: string): Promise<Order> {
    throw new Error("method not implemented")
  }

  findAll(): Promise<Order[]> {
    throw new Error("method not implemented")
  }

  update(entity: Order): Promise<void> {
    throw new Error("method not implemented")
  }
}