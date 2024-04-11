import { Sequelize } from "sequelize-typescript";
import CustomerModelSequelize from "../model/customer.model";
import OrdersModelSequelize from "../model/order.model";
import OrderitemsModelSequelize from "../model/order-item.model";
import ProductModelSequelize from "../model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../../../domain/entity/customer";
import Address from "../../../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../../../domain/entity/product";
import OrderItem from "../../../../domain/entity/order-item";
import Order from "../../../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([
      CustomerModelSequelize,
      OrdersModelSequelize,
      OrderitemsModelSequelize,
      ProductModelSequelize
    ]);
    await sequelize.sync();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("any_customer_id", "john Done")
    const address = new Address("Street 1", 1, "10000-01", "Super city")
    customer.setAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("any_product_id", "TV 50 samsung", 2500)
    await productRepository.create(product)

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)
    const order = new Order("any_order_id", "any_customer_id", [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrdersModelSequelize.findOne({
      where: { id: order.id },
      include: ["items"]
    });
    expect(orderModel.toJSON()).toStrictEqual({
      "customer_id": customer.id,
      "id": order.id,
      "items": [
        {
          "id": orderItem.id,
          "name": orderItem.name,
          "order_id": order.id,
          "price": orderItem.price,
          "product_id": orderItem.productId,
          "quantity": orderItem.quantity
        }
      ],
      "total": order.total()
    })
  })
})