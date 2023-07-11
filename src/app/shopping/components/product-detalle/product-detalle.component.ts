import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'shared/models/product';
import { first } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detalle',
  templateUrl: './product-detalle.component.html',
  styleUrls: ['./product-detalle.component.css']
})
export class ProductDetalleComponent implements OnInit {
  id?: string;

  product: Product;
 shoppingCart: ShoppingCart;
flagDescription;
cart:any;
  cart$: Observable<ShoppingCart>;
  constructor(private productService: ProductService, 
    private router: ActivatedRoute,
     private shoppingCartService: ShoppingCartService
     ) { }

   async ngOnInit(): Promise<void> {

    this.id = this.router.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.product = p));
    }
    this.cart$ = await this.shoppingCartService.getCart();
   

  }

}
