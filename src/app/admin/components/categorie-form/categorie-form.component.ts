import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'shared/services/categories.service';
import { Categories } from 'shared/models/categories';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-categorie-form',
  templateUrl: './categorie-form.component.html',
  styleUrls: ['./categorie-form.component.css']
})
export class CategorieFormComponent implements OnInit {

  categories$;
  id?: string;
categorie: Categories = {
    name: '',
    id:'' 
  };

  constructor(private categoriesService: CategoriesService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
   this.categories$ = this.categoriesService.getRole();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.categoriesService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.categorie = p));
    }
  }

  save() {
    // If the page has an id parameter 'admin/products/:id' the update method will be called
    if (this.id) {
      this.categoriesService
        .update(this.categorie, this.id)
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
      this.categoriesService
        .create(this.categorie)
        .then(() => {
          this.toast.success('Product has been added.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been saved.');
        });
    }

   
    this.router.navigate(['/admin/categories']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.categoriesService
        .delete(this.id)
        .then(() => {
          this.toast.success('Product has been deleted.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been deleted.');
        });

  
      this.router.navigate(['/admin/categories']);
    }
  }


}
