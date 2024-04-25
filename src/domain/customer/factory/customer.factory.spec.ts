import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create("john")
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("john");
    expect(customer.address).toBeNull();
  });

  it("Should create a customer with address", () => {
    const address = new Address("Main", 123, "60060-169", "Any City")
    const customer = CustomerFactory.createWithAddress("john", address)
    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("john");
    expect(customer.address).toBe(address);
  })
});