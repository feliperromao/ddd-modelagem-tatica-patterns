import { randomUUID } from "crypto";
import Customer from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import Address from "../value-object/address";

export default class CustomerFactory{
  public static create(name: string): CustomerInterface {
    const id = randomUUID()
    return new Customer(id, name)
  }

  public static createWithAddress(name: string, address: Address): CustomerInterface {
    const id = randomUUID()
    const customer = new Customer(id, name)
    customer.setAddress(address)
    return customer
  }
}