import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository-interface";
import Product from "../../../../domain/product/entity/product";
import ProductModelSequelize from "../model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModelSequelize.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  async update(entity: Product): Promise<void> {
    await ProductModelSequelize.update({
      name: entity.name,
      pice: entity.price
    },{
      where: {id: entity.id}
    })
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModelSequelize.findOne({where: {id: id} })
    return new Product(product.id, product.name, product.price)
  }
  
  async findAll(): Promise<Product[]> {
    const models = await ProductModelSequelize.findAll();
    return models.map(item => (new Product(item.id, item.name, item.price)))
  }
  
}