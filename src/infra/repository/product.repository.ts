import Product from "src/domain/entity/product";
import ProductRepositoryInterface from "src/domain/repository/product-repository-interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  find(id: string): Promise<Product> {
    throw new Error("method not implemented");
  }
  
  findAll(): Promise<Product[]> {
    throw new Error("method not implemented");
  }
  
  update(entity: Product): Promise<void> {
    throw new Error("method not implemented");
  }
}