import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { Employee } from 'shared/models/employee';
import { CategoriesService } from 'shared/services/categories.service';
import { EmployeeService } from 'shared/services/employee.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  categories$;
  id?: string;
  employee: Employee = {
    name: '',
    email: '',
    password: '',
    isAdmin: null,
    isEmploye: null,
    
  };

  constructor(private categoriesService: CategoriesService,
    private employeeService: EmployeeService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void { 
   this.categories$ = this.categoriesService.getRole();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.employeeService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.employee = p));
    }
  }

  save() {
   
    if (this.id) {
      this.employeeService
        .update(this.employee, this.id)
        .then(() => {
          this.toast.success('Empleado editado correctamente');
        })
        .catch(() => {
          this.toast.error(
            'Hubo un error'
          );
        });
    } else {
     
      this.employeeService
        .create(this.employee)
        .then(() => {
          this.toast.success('Empleado creado correctamente');
        })
        .catch(() => {
          this.toast.error('Hubo un error');
        });
    }

   
    this.router.navigate(['/admin/employee']);
  }

  delete() {
    if (confirm('Estas seguro de borrar este empleado?')) {
      this.employeeService
        .delete(this.id)
        .then(() => {
          this.toast.success('Empleado eliminado');
        })
        .catch(() => {
          this.toast.error('Hubo un error.');
        });

  
      this.router.navigate(['/admin/employee']);
    }
  }

}
