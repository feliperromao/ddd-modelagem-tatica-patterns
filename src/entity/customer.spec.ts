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
})