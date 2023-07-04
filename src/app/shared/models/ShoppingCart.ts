import { ShoppingCartItem } from './ShoppingCartItem';
import { Product } from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(
    private itemsMap: { [productId: string]: ShoppingCartItem },
    public dateCreated: number
  ) {
  
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
    console.log('productos',itemsMap);
  }

  get productIds() {
    return Object.keys(this.items);
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }

  get totalPrice() {
    let sum = 0;

    for (let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.id];
    return item ? item.quantity : 0;
  }
}
