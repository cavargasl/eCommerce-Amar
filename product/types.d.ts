interface Product {
  id: string,
  title: string,
  category: string,
  description: string,
  image: string[],
  price: number,
  tag: string,
  offert: number,
  verticalImage: boolean,
}
interface CartItem extends Product {
  quantity: number;
}