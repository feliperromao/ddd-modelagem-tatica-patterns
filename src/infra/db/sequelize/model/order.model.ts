import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModelSequelize from "./customer.model";
import OrderitemsModelSequelize from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false
})
export default class OrdersModelSequelize extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  declare id: string

  @ForeignKey(() => CustomerModelSequelize)
  @Column({allowNull: false})
  declare customer_id: string

  @BelongsTo(() => CustomerModelSequelize)
  declare customer: CustomerModelSequelize

  @HasMany(() => OrderitemsModelSequelize)
  declare items: OrderitemsModelSequelize[]

  @Column({allowNull: false})
  declare total: number
}