import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductTableService } from 'admin/services/product-table.service';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-admin-mercaderia',
  templateUrl: './admin-mercaderia.component.html',
  styleUrls: ['./admin-mercaderia.component.css']
})
export class AdminMercaderiaComponent implements OnInit {

  @ViewChild('query') query: ElementRef;
  products: Product[];
  productsSubscription: Subscription;

  constructor(
    private productService: ProductService,
    public productTableService: ProductTableService
  ) {}

  ngOnInit(): void {
    this.productsSubscription = this.productService.getAll().subscribe((p) => {
      this.products = p;
     this.filter(this.query.nativeElement.value);
    });
 
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  filter(query: string) {
    query
      ? this.productTableService.filteredProducts$.next(
          this.products.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          )
        )
      : this.productTableService.filteredProducts$.next(this.products);
  }

}
