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
import { CategorieFormComponent } from './components/categorie-form/categorie-form.component';
import { AdminZonasComponent } from './components/admin-zonas/admin-zonas.component';
import { ZonasFormComponent } from './components/zonas-form/zonas-form.component';
import { EmployeeAuthGuardService } from './services/employee-auth-guard.service';
import { AdminReposicionComponent } from './components/admin-reposicion/admin-reposicion.component';
import { AdminMercaderiaComponent } from './components/admin-mercaderia/admin-mercaderia.component';
import { MercaderiaFormComponent } from './components/mercaderia-form/mercaderia-form.component';


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
    CategorieFormComponent,
    AdminZonasComponent,
    ZonasFormComponent,
    AdminReposicionComponent,
    AdminMercaderiaComponent,
    MercaderiaFormComponent,

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
            path: 'reposicion',
            component: AdminReposicionComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'employeeAdm',
            component: AdminEmployeeComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
                     },
          {
            path: 'employeeAdm/new',
            component: EmployeeFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'employeeAdm/:uid',
            component: EmployeeFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'categories',
            component: AdminCategoriesComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'categories/new',
            component: CategorieFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'categories/:id',
            component: CategorieFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'zonas',
            component: AdminZonasComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'zonas/new',
            component: ZonasFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'zonas/:id',
            component: ZonasFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'addProducts/new',
            component:  MercaderiaFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'addProducts',
            component: AdminMercaderiaComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
        ],
      }
    ]),
  ],
  providers: [AdminAuthGuardService, ProductTableService],
})
export class AdminModule {}
