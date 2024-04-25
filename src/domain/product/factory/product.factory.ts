import { randomUUID } from "crypto";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import ProductB from "../entity/product-b";

export default class ProductFactory {
  public static create(type: string, name: string, price: number): ProductInterface {
    const id = randomUUID()
    switch(type){
      case 'a':
        return new Product(id, name, price)
      case 'b':
        return new ProductB(id, name, price)
      default:
        throw new Error("Product type not supported")
    }
  }
}