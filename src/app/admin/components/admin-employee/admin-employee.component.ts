import {  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef, } from '@angular/core';
import { Employee } from 'shared/models/employee';
import { Subscription } from 'rxjs';
import { EmployeeService } from 'shared/services/employee.service';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './admin-employee.component.html',
  styleUrls: ['./admin-employee.component.css']
})
export class AdminEmployeeComponent implements OnInit {
  @ViewChild('query') query: ElementRef;
  products: Employee[];
  productsSubscription: Subscription;
  constructor( private productService: EmployeeService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.getAll().subscribe((p) => {
      this.products = p;
     //this.filter(this.query.nativeElement.value);
    });
  }

}
