import { ToastrService } from 'ngx-toastr';
import { ShoppingCartItem } from './ShoppingCartItem';
import { Product } from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  ToastrService: ToastrService;
  private quantityCache: { [productId: string]: number } = {};

  constructor(
    private itemsMap: { [productId: string]: ShoppingCartItem },
     public dateCreated: number) {
  
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
      if(count>=this.items[productId].product.stock) count=this.items[productId].product.stock;
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
 /*get totalEnvio(){

 }*/
  getQuantity(product: Product) {
    let item = this.itemsMap[product.id];
  
  
    if ((item && item.quantity <= product.stock )&&(item && item.quantity >=0)) {
      this.quantityCache[product.id] = item.quantity;
      return  item ? item.quantity:0;
    } else if (item && item.quantity > product.stock) {
      item.quantity=product.stock
      return item.quantity;
    }
    /*let item = this.itemsMap[product.id];
    return item && item.quantity <= product.stock ? item.quantity : 0;*/
  }
}
