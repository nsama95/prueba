import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { Employee } from 'shared/models/employee';
import { AuthService } from 'shared/services/auth.service';
import { CategoriesService } from 'shared/services/categories.service';
import { EmployeeService } from 'shared/services/employee.service';
@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  categories$;
  uid?: string;
  employee: Employee = {
    name: '',
    email: '',
    password: '',
    isAdmin: null,
    isEmployee: null,
    
  };
user:AppUser;
idUser;
  constructor(private categoriesService: CategoriesService,
    private employeeService: EmployeeService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private authServ:AuthService,
    private fbAuth: AngularFireAuth) { }

  async ngOnInit(): Promise<void> { 
    this.authServ.appUser$.subscribe((user: AppUser) => {
      this.user = user;
    });
    const user = await this.fbAuth.currentUser;
  console.log(user.uid);
  this.idUser=user.uid;
   this.categories$ = this.categoriesService.getRole();

    this.uid = this.route.snapshot.paramMap.get('uid');

    if (this.uid) {
      this.employeeService
        .get(this.uid)
        .pipe(first())
        .subscribe((p) => (this.employee = p));
    }
  }

  save() {
   
    if (this.uid) {
      this.employeeService
        .update(this.employee, this.uid,this.idUser)
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
        .create(this.employee,this.idUser)
        .then(() => {
          this.toast.success('Empleado creado correctamente');
        })
        .catch(() => {
          this.toast.error('Hubo un error');
        });
    }

    setTimeout(() => {
      this.router.navigate(['/admin/employee']);}, 700);
  }

  delete() {
    if (confirm('Estas seguro de borrar este empleado?')) {
      this.employeeService
        .delete(this.uid)
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