import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions;
  @Input() shoppingCart: ShoppingCart;
  flagDescription=false;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }
  showDescription(){
    if(this.flagDescription){this.flagDescription=false;}else{this.flagDescription=true;}
  }
}
