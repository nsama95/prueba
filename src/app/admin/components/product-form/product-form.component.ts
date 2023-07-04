import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'shared/services/categories.service';
import { ProductService } from 'shared/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'app/shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;

  // optional id field from route parameters /admin/products/:id
  id?: string;

  images: string[];
  // optional product field that contains the product object
  product: Product = {
    title: '',
    price: null,
    category: '',
    imageUrl: '',
  };

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) {this.images = [];}
  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.product = p));
    }
  }

  save() {
    if (this.id) {
      //this.uploadImage($event,this.product);
      this.productService
        .update(this.product, this.id)
        .then(() => {
          this.toast.success('Producto editado.');
        })
        .catch(() => {
          this.toast.error(
            'Hubo un error.'
          );
        });
    } else {
      //this.uploadImage($event,this.product);
      this.productService
        .create(this.product)
        .then(() => {
          this.toast.success('Producto creado.');
        })
        .catch(() => {
          this.toast.error('Hubo un error');
        });
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Estas seguro de borrar el producto?')) {
      this.productService
        .delete(this.id)
        .then(() => {
          this.toast.success('Producto eliminado.');
        })
        .catch(() => {
          this.toast.error('hubo un error.');
        });

      /* upon saving, the user will NOT wait for the promise to resolve. 
        The user will be redirected to AdminProducts and will receive a toast notification */
      this.router.navigate(['/admin/products']);
    }
  }
}
