import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-mercaderia-form',
  templateUrl: './mercaderia-form.component.html',
  styleUrls: ['./mercaderia-form.component.css']
})
export class MercaderiaFormComponent implements OnInit {
  product: Product = {
    title: '',
    price: null,
    category: '',
    description:'',
    max:null,
    min:null,
    stock:0,
    imageUrl: '',
    reposicion:null,
  };
  selectedProduct: Product;
  products;
  productsSubscription: Subscription;
  constructor( private productService: ProductService,private toast: ToastrService, private router: Router,) { }

  ngOnInit(): void {
    this.products = this.productService.getAll();
  }
  SetearProduct(value: any){
    this.products.pipe(first()).subscribe(prod=>{
      const selectedProduct = prod.find(p => p.id === this.product.id);
      if (selectedProduct) {
       this.product=selectedProduct;        
      }
    });
  }
  save() {
 
      this.productService
        .update(this.product, this.product.id)
        .then(() => {
          this.toast.success('Stock agregado.');
        })
        .catch(() => {
          this.toast.error(
            'Hubo un error.'
          );
        });
    
    this.router.navigate(['/admin/addProducts']);
  }

 /* delete() {
    if (confirm('Estas seguro de borrar el producto?')) {
      this.productService
        .delete(this.id)
        .then(() => {
          this.toast.success('Producto eliminado.');
        })
        .catch(() => {
          this.toast.error('hubo un error.');
        });

   
      this.router.navigate(['/admin/products']);
    }
  }*/

}
