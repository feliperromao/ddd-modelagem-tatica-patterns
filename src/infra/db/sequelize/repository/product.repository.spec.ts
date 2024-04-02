import { Sequelize } from "sequelize-typescript";
import ProductModelSequelize from "../model/product.model";
import Product from "../../../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize

  beforeEach(async() => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    });
    sequelize.addModels([ProductModelSequelize]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Produto 1", 100)
    await productRepository.create(product)

    const productModel = await ProductModelSequelize.findOne({where: {id: "1"}})
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Produto 1",
      price: 100
    })
  });

  it.skip("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Produto 1", 100)
    await productRepository.create(product)

    product.changeName("Produto 1 updated")
    product.changePrice(300)
    await productRepository.update(product)

    const productModel = await ProductModelSequelize.findOne({where: {id: "1"}})
    
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Produto 1 updated",
      price: 200
    })
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Produto 1", 100)
    await productRepository.create(product)
    const productModel = await productRepository.find("1")
    expect(productModel).toStrictEqual(product)
  });

  it("should find all product", async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product("1", "Produto 1", 100)
    await productRepository.create(product1)

    const product2 = new Product("2", "Produto 2", 100)
    await productRepository.create(product2)

    const product3 = new Product("3", "Produto 3", 100)
    await productRepository.create(product3)
    
    const products = [product1, product2, product3]
    const foundProducts = await productRepository.findAll()

    expect(products).toEqual(foundProducts)
  });
});