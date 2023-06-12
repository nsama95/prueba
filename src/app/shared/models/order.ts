import { ShoppingCart } from './ShoppingCart';
import { orderItem } from './orderItem';
import { Shipping } from './shipping';
export type state = 'Realizado' | 'Confirmado' | 'empaquetado'| 'enviado al correo' | 'entregado';
export class Order {
  id: string;
  datePlaced: number;
  items: orderItem[];
  state:state;
  numEnvio:number;
  constructor(
    public userId: string,
    public shipping: Shipping,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();
    this.state= 'Realizado';
    this.numEnvio=null
    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}
