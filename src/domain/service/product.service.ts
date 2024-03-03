import Product from "src/domain/entity/product";

export default class ProductService {
  static incresePrice(products: Product[], percent: number): Product[] {
    products.forEach(product => {
      product.changePrice((product.price * percent) / 100 + product.price )
    });

    return products;
  }
}