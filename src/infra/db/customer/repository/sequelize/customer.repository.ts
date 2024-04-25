import Customer from "../../../../../domain/customer/entity/customer";
import CustomerModelSequelize from "../../model/sequelize/customer.model";
import Address from "../../../../../domain/customer/value-object/address";
import CustomerRepositoryInterface from "../../../../../domain/customer/repository/customer-repository-interface";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModelSequelize.create({
      id: entity.id,
      name: entity.name,
      street: entity?.address?.street,
      number: entity?.address?.number,
      zipcode: entity?.address?.zip,
      city: entity?.address?.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    })
  }

  async find(id: string): Promise<Customer> {
    let customerModelDB;
    try {
      customerModelDB = await CustomerModelSequelize.findOne({
        where: {id: id},
        rejectOnEmpty: true
      })
    } catch (error) {
      throw new Error("Customer not found")
    }
    const customer = new Customer(id, customerModelDB.name)
    const address = new Address(
      customerModelDB.street,
      customerModelDB.number,
      customerModelDB.zipcode,
      customerModelDB.city
    )
    customer.setAddress(address)
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const allCustomersModelDB = await CustomerModelSequelize.findAll()
    return allCustomersModelDB.map(item => {
      let customer = new Customer(item.id, item.name)
      customer.setAddress(new Address(item.street, item.number, item.zipcode, item.city))
      customer.addRewardPoints(item.rewardPoints)
      if (item.active) {
        customer.activate()
      }
      return customer;
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModelSequelize.update({
      name: entity.name,
      street: entity?.address?.street,
      number: entity?.address?.number,
      zipcode: entity?.address?.zip,
      city: entity?.address?.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints
    }, {
      where: {id: entity.id}
    })
  }
}