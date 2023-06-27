import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ProductTableService } from './services/product-table.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthguardService } from 'shared/services/authguard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { OrderService } from 'shared/services/order.service';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomeComponent } from 'core/components/home/home.component';
import { AdminCategoriesComponent } from './components/admin-categories/admin-categories.component';
import { AdminEmployeeComponent } from './components/admin-employee/admin-employee.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@NgModule({
  declarations: [
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    SortableTableDirective,
    AdminHomeComponent,
    AdminCategoriesComponent,
    AdminEmployeeComponent,
    EmployeeFormComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'admin',
        children: [
          {
            path: 'orders',
            component: AdminOrdersComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'homeP',
            component: HomeComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'products/new',
            component: ProductFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'products/:id',
            component: ProductFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'products',
            component: AdminProductsComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'employee',
            component: AdminEmployeeComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'employee/new',
            component: EmployeeFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'employee/:id',
            component: EmployeeFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
        ],
      },
    ]),
  ],
  providers: [AdminAuthGuardService, ProductTableService],
})
export class AdminModule {}
