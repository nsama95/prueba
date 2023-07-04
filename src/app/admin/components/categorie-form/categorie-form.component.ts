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
   
    if (this.id) {
      this.categoriesService
        .update(this.categorie, this.id)
        .then(() => {
          this.toast.success('Categoria editada correctamente');
        })
        .catch(() => {
          this.toast.error(
            'Hubo un error'
          );
        });
    } else {
     
      this.categoriesService
        .create(this.categorie)
        .then(() => {
          this.toast.success('Categoria creada correctamente');
        })
        .catch(() => {
          this.toast.error('hubo un error');
        });
    }

   
    this.router.navigate(['/admin/categories']);
  }

  delete() {
    if (confirm('Estas seguro de borrar esta categoria?')) {
      this.categoriesService
        .delete(this.id)
        .then(() => {
          this.toast.success('Categoria borrada.');
        })
        .catch(() => {
          this.toast.error('hubo un error.');
        });

  
      this.router.navigate(['/admin/categories']);
    }
  }


}
