import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../../src/domain/entity/product";
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
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Produto 1", 100)
    await productRepository.create(product)

    const productModel = await ProductModel.findOne({where: {id: "1"}})
    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Produto 1",
      price: 100
    })
  })

});