import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableService } from './services/product-table.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthguardService } from 'shared/services/authguard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableTableDirective } from './directives/sortable-table.directive';
import { OrderService } from 'shared/services/order.service';


import { EmployeeAuthGuardService } from './services/employee-auth-guard.service';
import { ZonasFormEmployeeComponent } from './components/zonas-form-employee/zonas-form-employee.component';
import { ProductFormEmployeeComponent } from './components/product-form-employee/product-form-employee.component';
import { MercaderiaFormEmployeeComponent } from './components/mercaderia-form-employee/mercaderia-form-employee.component';
import { EmployeeZonasComponent } from './components/employee-zonas/employee-zonas.component';
import { EmployeeReposicionComponent } from './components/employee-reposicion/employee-reposicion.component';
import { EmployeeProductsComponent } from './components/employee-products/employee-products.component';
import { EmployeeOrdersComponent } from './components/employee-orders/employee-orders.component';
import { EmployeeMercaderiaComponent } from './components/employee-mercaderia/employee-mercaderia.component';
import { EmployeeCategoriesComponent } from './components/employee-categories/employee-categories.component';
import { CategorieFormEmployeeComponent } from './components/categorie-form-employee/categorie-form-employee.component';
import { EmployeeFormComponent } from 'admin/components/employee-form/employee-form.component';


@NgModule({
  declarations: [
    
    SortableTableDirective,
    ZonasFormEmployeeComponent,
    ProductFormEmployeeComponent,
    MercaderiaFormEmployeeComponent,
    EmployeeZonasComponent,
    EmployeeReposicionComponent,
    EmployeeProductsComponent,
    EmployeeOrdersComponent,
    EmployeeMercaderiaComponent,
    EmployeeCategoriesComponent,
    CategorieFormEmployeeComponent


  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'employee',
        children: [
          {
            path: 'orders',
            component: EmployeeOrdersComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'products/new',
            component: ProductFormEmployeeComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'products/:id',
            component: ProductFormEmployeeComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'products',
            component: EmployeeProductsComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'reposicion',
            component: EmployeeReposicionComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
         
        
          {
            path: 'categories',
            component: EmployeeCategoriesComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'categories/new',
            component: EmployeeFormComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'categories/:id',
            component: EmployeeFormComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'zonas',
            component: EmployeeZonasComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'zonas/new',
            component: ZonasFormEmployeeComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'zonas/:id',
            component: ZonasFormEmployeeComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'mercaderia/new',
            component: MercaderiaFormEmployeeComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
          {
            path: 'mercaderia',
            component: EmployeeMercaderiaComponent,
            canActivate: [AuthguardService, EmployeeAuthGuardService],
          },
        ],
      }
    ]),
  ],
  providers: [EmployeeAuthGuardService, ProductTableService],
})
export class EmployeeModule {}
