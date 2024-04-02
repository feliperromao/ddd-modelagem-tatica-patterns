import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "customer",
  timestamps: false
})
export default class CustomerModel extends Model {
  @PrimaryKey
  @Column({allowNull: false})
  declare id: string

  @Column({allowNull: false})
  declare name: string

  @Column({allowNull: true})
  declare address: string

  @Column({allowNull: false})
  declare active: boolean

  @Column({allowNull: false})
  declare rewardPoints: number
}