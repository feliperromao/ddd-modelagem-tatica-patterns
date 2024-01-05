import Address from "./address"
import Customer from "./customer"

describe("Customer entity test", () => {
  it("should throws if id is empty", () => {
    expect(() => {
      new Customer("", "Felipe")
    }).toThrowError("Id is required")
  })
  
  it("should throws if name is empty", () => {
    expect(() => {
      new Customer("123", "")
    }).toThrowError("Name is required")
  })

  describe("changeName", () => {
    it("should throws if changeName called with empty string", () => {
      expect(() => {
        const customer = new Customer("123", "Felipe")
        customer.changeName("")
      }).toThrowError("Name is required") 
    })

    it("should change name", () => {
      const customer = new Customer("123", "Felipe")
      customer.changeName("Felipe Romao")
      expect(customer.getName()).toBe("Felipe Romao")
    })
  })
  

  describe("activate and activate", () => {
    it("should throws if address is empty", () => {
      expect(() => {
        const customer = new Customer("123", "Felipe")
        customer.activate()
      }).toThrowError("Address is required to activade a customer")
    })

    it("should activate customer", () => {
      const customer = new Customer("123", "Felipe")
      const address = new Address("Rua 1", 123, "60020-450", "Sao Paulo")
      customer.setAddress(address)
      customer.activate()
      expect(customer.isActive()).toBeTruthy()
    })

    it("should deactivate customer", () => {
      const customer = new Customer("123", "Felipe")
      customer.deactivate()
      expect(customer.isActive()).toBeFalsy()
    })
  })
})