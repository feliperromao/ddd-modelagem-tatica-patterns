import Product from "./product"

describe("Product unit tests", () => {
  it("should throw error if id is empty", () => {
    expect(() => {
      const product = new Product("", "Produto 1", 100)
    }).toThrowError("Id is required")
  })

  it("should throw error if name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100)
    }).toThrowError("Name is required")
  })

  it("should throw error if price is empty", () => {
    expect(() => {
      const product = new Product("123", "Produto 1", null)
    }).toThrowError("Price is required")
  })

  it("should throw error if price less than zero", () => {
    expect(() => {
      const product = new Product("123", "Produto 1", -1)
    }).toThrowError("Price must be greater than zero")
  })

  it("should change name", () => {
    const product = new Product("123", "Produto 1", 100)
    product.changeName("Produto 2");
    expect(product.name).toBe("Produto 2")
  })

  it("should change price", () => {
    const product = new Product("123", "Produto 1", 100)
    product.changePrice(200);
    expect(product.price).toBe(200)
  })
})