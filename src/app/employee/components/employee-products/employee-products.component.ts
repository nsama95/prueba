import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'app/shared/models/product';
import { ProductTableService } from 'admin/services/product-table.service';

@Component({
  selector: 'app-employee-products',
  templateUrl: './employee-products.component.html',
  styleUrls: ['./employee-products.component.css'],
})
export class EmployeeProductsComponent implements OnInit, OnDestroy {
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
