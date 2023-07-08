import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { CategoriesService } from 'shared/services/categories.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  products: Product[];
  currentCategory: string;
  filteredProducts: Product[];
  cart: any;
  cart$: Observable<ShoppingCart>;
  cardsPerRow: number;
  flag;
  categories$: Observable<any>;
  vacio;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCart: ShoppingCartService,
    private categoriesService: CategoriesService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCart.getCart();
    this.populateProducts();
    this.calculateRows(window.innerWidth);
    this.categories$ = this.categoriesService.getAll();
      this.flag=false;
      this.vacio=false;
  }

  public populateProducts() {
    this.vacio=false;
    this.productService
      .getAll()
      .pipe(
        switchMap((p) => {
          this.products = p;
          return this.route.queryParamMap;
        })
      )
      .subscribe((p) => {
        this.currentCategory = p.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.currentCategory
      ? this.products.filter((p) => {
          return p.category === this.currentCategory;
        })
      : this.products;
  }
   redirecta(id){
    this.flag=true;
    setTimeout(() => {
       this.productService.getProductsByCategory(id).subscribe((result)=> {
        this.filteredProducts=result;
        
        if(this.filteredProducts.length>0){
          this.vacio=false;
        }else{
          this.vacio=true;
        }
      } 
    );
    this.flag=false;
    console.log(this.vacio);
  }, 1000);
 
  
  }
  @HostListener('window:resize', ['$event.target.innerWidth'])
  private CardsPerRow(width) {
    this.calculateRows(width);
  }

  private calculateRows(width) {
    if (width >= 1700) {
      this.cardsPerRow = 4;
    } else if (width >= 770 && width < 1700) {
      this.cardsPerRow = 3;
    } else if (width < 770 && width >= 520) {
      this.cardsPerRow = 2;
    } else {
      this.cardsPerRow = 1;
    }
  }
}
