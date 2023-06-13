import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RegistrarComponent} from './components/registrar/registrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [NavbarComponent, HomeComponent, LoginComponent, RegistrarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, RouterModule.forChild([]), NgbModule, FormsModule, ReactiveFormsModule],
})
export class COREModule {}
