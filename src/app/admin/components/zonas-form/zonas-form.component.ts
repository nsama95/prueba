import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Zonas } from 'shared/models/zonas';
import { ZonasService } from 'shared/services/zonas.service';

@Component({
  selector: 'app-zonas-form',
  templateUrl: './zonas-form.component.html',
  styleUrls: ['./zonas-form.component.css']
})
export class ZonasFormComponent implements OnInit {

  categories$;
  id?: string;
zonas: Zonas = {
    name: '',
    price:0,
    id:'' 
  };

  constructor(private zonasService: ZonasService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
   //this.categories$ = this.categoriesService.getRole();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.zonasService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.zonas = p));
    }
  }

  save() {
    // If the page has an id parameter 'admin/products/:id' the update method will be called
    if (this.id) {
      this.zonasService
        .update(this.zonas, this.id)
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
      this.zonasService
        .create(this.zonas)
        .then(() => {
          this.toast.success('Product has been added.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been saved.');
        });
    }

   
    this.router.navigate(['/admin/zonas']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.zonasService
        .delete(this.id)
        .then(() => {
          this.toast.success('Product has been deleted.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been deleted.');
        });

  
      this.router.navigate(['/admin/zonas']);
    }
  }


}
