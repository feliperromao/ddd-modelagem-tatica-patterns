import Product from "../entity/product"
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change prices of all products", () => {
    const p1 = new Product("p1", "Product 1", 10);
    const p2 = new Product("p2", "Product 2", 20);
    const products =  [p1, p2]
    ProductService.incresePrice(products, 100)

    expect(p1.price).toBe(20)
    expect(p2.price).toBe(40)
  })
})