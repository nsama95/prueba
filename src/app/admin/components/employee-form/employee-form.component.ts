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
    // If the page has an id parameter 'admin/products/:id' the update method will be called
    if (this.id) {
      this.employeeService
        .update(this.employee, this.id)
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
      this.employeeService
        .create(this.employee)
        .then(() => {
          this.toast.success('Product has been added.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been saved.');
        });
    }

   
    this.router.navigate(['/admin/employee']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.employeeService
        .delete(this.id)
        .then(() => {
          this.toast.success('Product has been deleted.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been deleted.');
        });

  
      this.router.navigate(['/admin/employee']);
    }
  }

}
