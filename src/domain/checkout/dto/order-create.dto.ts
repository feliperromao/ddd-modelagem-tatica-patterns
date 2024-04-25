import OrderItem from "../entity/order-item"


export default interface OrderCreateDTO {
  customerId: string
  items: {
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number,
  }[]
}