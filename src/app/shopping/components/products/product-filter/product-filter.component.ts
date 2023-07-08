import { Component, OnInit, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { CategoriesService } from 'shared/services/categories.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Input() currentCategory;
  categories$: Observable<any>;
  @Output() listProducts:Product[];
  flag;
 // ,productService
  constructor(private categoriesService: CategoriesService,private productsServices :ProductService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
      this.flag=false;
  }
  redirecta(id){
    this.flag=true;
      console.log(id);
 this.productsServices.getProductsByCategory(id).subscribe((result)=>
    
    this.listProducts=result
    );
    this.flag=false;
    console.log(this.listProducts);
    
  }
}
