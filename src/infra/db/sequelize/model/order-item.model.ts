import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModelSequelize from "./customer.model";
import ProductModelSequelize from "./product.model";
import OrdersModelSequelize from "./order.model";

@Table({
  tableName: "order_items",
  timestamps: false
})
export default class OrderitemsModelSequelize extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  declare id: string

  @ForeignKey(() => ProductModelSequelize)
  @Column({allowNull: false})
  declare product_id: string

  @BelongsTo(() => ProductModelSequelize)
  declare product: ProductModelSequelize

  @ForeignKey(() => OrdersModelSequelize)
  @Column({allowNull: false})
  declare order_id: string

  @BelongsTo(() => OrdersModelSequelize)
  declare order: OrdersModelSequelize

  @Column({allowNull: false})
  declare quantity: number

  @Column({allowNull: false})
  declare name: string

  @Column({allowNull: false})
  declare price: number
}