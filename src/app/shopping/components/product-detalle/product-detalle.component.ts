import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { first } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/ShoppingCart';

@Component({
  selector: 'app-product-detalle',
  templateUrl: './product-detalle.component.html',
  styleUrls: ['./product-detalle.component.css']
})
export class ProductDetalleComponent implements OnInit {
  id?: string;
  products: Product;
  @Input() product: Product;
  @Input() showActions;
  @Input() shoppingCart: ShoppingCart;


  constructor(private productService: ProductService, private router: ActivatedRoute, private shoppingCartService: ShoppingCartService) { }

   ngOnInit(): void {

    this.id = this.router.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.product = p));
    }


  }
  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

}
