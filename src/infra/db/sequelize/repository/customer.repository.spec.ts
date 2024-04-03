import { Sequelize } from "sequelize-typescript";
import CustomerModelSequelize from "../model/customer.model";
import Customer from "../../../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../../../domain/entity/address";


describe("Customer repository test", () => {
  let sequelize: Sequelize

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    });
    sequelize.addModels([CustomerModelSequelize]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customer = new Customer("1", "customer 1")
    const address = new Address("rua 1", 192, "60821420", "Fortaleza")
    customer.setAddress(address)
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)

    const customerModelDB = await CustomerModelSequelize.findOne({where: {id: "1"}})
    expect(customerModelDB.toJSON()).toStrictEqual({
      "active": false,
      "city": "Fortaleza",
      "id": "1",
      "name": "customer 1",
      "number": 192,
      "rewardPoints": 0,
      "street": "rua 1",
      "zipcode": "60821420",
    })
  });

  it("should update a customer", async () => {
    const customer = new Customer("1", "customer 1")
    const address = new Address("rua 1", 192, "60821420", "Fortaleza")
    customer.setAddress(address)
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)
    
    customer.changeName("Felipe Martins")
    customer.addRewardPoints(500)
    customer.activate()
    
    customerRepository.update(customer)
    const customerModelDB = await CustomerModelSequelize.findOne({where: {id: "1"}})
    expect(customerModelDB.toJSON()).toStrictEqual({
      "active": true,
      "city": "Fortaleza",
      "id": "1",
      "name": "Felipe Martins",
      "number": 192,
      "rewardPoints": 500,
      "street": "rua 1",
      "zipcode": "60821420",
    })
  });

  it("should find a customer", async () => {
    const customer = new Customer("1", "customer 1")
    const address = new Address("rua 1", 192, "60821420", "Fortaleza")
    customer.setAddress(address)
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)

    const customerModelDB = await customerRepository.find("1")
    expect(customer).toEqual(customerModelDB)
  })

  it("should throws if not found a customer", async () => {
    const customerRepository = new CustomerRepository()
    expect(async () => {
      await customerRepository.find("ABC123")
    }).rejects.toThrow("Customer not found")
  })

  it("should find all customer", async () => {
    const customer1 = new Customer("1", "Customer 1")
    customer1.setAddress(new Address("street 1", 1, "10001", "city 01"))
    customer1.addRewardPoints(125)
    const customer2 = new Customer("2", "Customer 2")
    customer2.setAddress(new Address("street 2", 2, "10001", "city 02"))
    customer2.activate()
    
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const allCustomers = await customerRepository.findAll()
    expect(allCustomers.length).toBe(2)
    expect(allCustomers).toContainEqual(customer1)
    expect(allCustomers).toContainEqual(customer2)
  })
})