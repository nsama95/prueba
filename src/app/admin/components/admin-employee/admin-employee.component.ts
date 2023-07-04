import {  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef, } from '@angular/core';
import { Employee } from 'shared/models/employee';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'shared/services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css']
})
export class AdminEmployeeComponent implements OnInit {
  @ViewChild('query') query: ElementRef;
  employee: Employee[];
  employeeSubscription: Subscription;
  constructor( private employeeService: EmployeeService, private toast: ToastrService,) { }

  ngOnInit(): void {
    this.employeeSubscription = this.employeeService.getAll().subscribe((p) => {
      this.employee = p;
      console.log(JSON.stringify( this.employee));
     //this.filter(this.query.nativeElement.value);
    });
    
  }
  resetPassword(email){
    this.employeeService.resetPassword(email).then(() => {
      this.toast.success('Correo de restablecimiento de contraseña enviado');
    }).catch(() => {
      this.toast.error(
        'Hubo un error'
      );
    });;
  }

}
