import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Zonas } from 'shared/models/zonas';
import { ZonasService } from 'shared/services/zonas.service';

@Component({
  selector: 'app-zonas-form-employee',
  templateUrl: './zonas-form-employee.component.html',
  styleUrls: ['./zonas-form-employee.component.css']
})
export class ZonasFormEmployeeComponent implements OnInit {

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
          this.toast.success('Tu zona editada correctamente.');
        })
        .catch(() => {
          this.toast.error(
            'Hubo un error'
          );
        });
    } else {
      // if the id parameter is not present the product will be saved as a new product
      this.zonasService
        .create(this.zonas)
        .then(() => {
          this.toast.success('Zona creada correctamente.');
        })
        .catch(() => {
          this.toast.error('Hubo un error');
        });
    }

   
    this.router.navigate(['/admin/zonas']);
  }

  delete() {
    if (confirm('Estas seguro de borrar esta zona?')) {
      this.zonasService
        .delete(this.id)
        .then(() => {
          this.toast.success('Zona borrada');
        })
        .catch(() => {
          this.toast.error('Hubo un error');
        });

  
      this.router.navigate(['/admin/zonas']);
    }
  }


}
