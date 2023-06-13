import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {
  formReg: FormGroup;
  Roles: any = ['User', 'Empleado', 'Full Admin'];
  constructor( private authService: AuthService) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
   }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('FORM REGISTRO'+this.formReg.value);
    this.authService.register(this.formReg.value)
      .then(response => {
        console.log('registro component'+response);
      })
      .catch(error => console.log(error));
  }
}
