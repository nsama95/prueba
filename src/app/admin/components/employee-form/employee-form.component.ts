import { Component, OnInit } from '@angular/core';
import { Employee } from 'shared/models/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  categories$;

  // optional id field from route parameters /admin/products/:id
  uid?: string;

  // optional product field that contains the product object
  employee: Employee = {
    name: '',
    email: '',
    password: '',
    isAdmin: null,
    isEmploye: null,
    
  };

  constructor(/*private categoriesService: CategoriesService,
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute*/) { }

  ngOnInit(): void { 
    /* this.categories$ = this.categoriesService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.product = p));
    }*/
  }

  /*save() {
    // If the page has an id parameter 'admin/products/:id' the update method will be called
    if (this.id) {
      this.productService
        .update(this.product, this.id)
        .then(() => {
          this.toast.success('Product has been successfully updated.');
        })
        .catch(() => {
          this.toast.error(
            'An error occurred. The product has not been updated.'
          );
        });
    } else {
      // if the id parameter is not present the product will be saved as a new product
      this.productService
        .create(this.product)
        .then(() => {
          this.toast.success('Product has been added.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been saved.');
        });
    }

   
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService
        .delete(this.id)
        .then(() => {
          this.toast.success('Product has been deleted.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been deleted.');
        });

  
      this.router.navigate(['/admin/products']);
    }
  }*/

}
