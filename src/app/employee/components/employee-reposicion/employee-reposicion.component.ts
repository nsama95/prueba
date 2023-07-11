import { Component, OnInit } from '@angular/core';
import { ProductTableService } from 'admin/services/product-table.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-employee-reposicion',
  templateUrl: './employee-reposicion.component.html',
  styleUrls: ['./employee-reposicion.component.css']
})
export class EmployeeReposicionComponent implements OnInit {
  products: Product[];
  productsSubscription: Subscription;
  productEditado: Product = {
    title: '',
    price: null,
    category: '',
    description:'',
    max:0,
    min:0,
    stock:0,
    imageUrl: '',
    reposicion:0,
  };
  flagRepo:boolean;
  constructor(private productService: ProductService,
    public productTableService: ProductTableService,private toast: ToastrService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.getAll().subscribe((p) => {
      this.products = p;
    });
    this.flagRepo=false;
  }
  editar(max, min,prod:Product){
    console.log(prod);
    this.productEditado=prod;
    this.productEditado.max=max;
    this.productEditado.min=min;

    this.productService.update(this.productEditado,prod.id).then(() => {
      this.toast.success('Producto editado.');
    })
    .catch(() => {
      this.toast.error(
        'Hubo un error.'
      );
    });
     
  }

  async calcularRepo(){
    this.flagRepo= true;
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      if (product.stock==0 ) {
        product.reposicion= product.max;
       await this.productService.update(product,product.id);
      } else if (product.stock < product.max) {
        product.reposicion=product.max-product.stock;
        await this.productService.update(product,product.id);
      }else if (product.stock>=product.max) {
        product.reposicion= 0;
        await this.productService.update(product,product.id);
      }
      else if (product.stock < product.min) {
        product.reposicion= product.stock-product.min;
        await this.productService.update(product,product.id);
      }
    }       
  }

}
