import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AppUser } from 'shared/models/app-user';
import { UserService } from 'shared/services/user.service';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  user : AppUser;
  constructor(private authService: AuthService, private router: Router,private toast: ToastrService) {

      this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })}

  ngOnInit(): void {
  }
  onSubmit() {
    console.log('login');

 this.authService.login(this.formLogin.value).then(response => {
        if(response){   console.log(response);
          //this.user=response;
          console.log('user'+JSON.stringify( this.user));
          this.toast.success('Iniciaste sesion.Bienvenido!');
          this.router.navigate(['/products']);
        }else{ 
            this.toast.error('Hubo un error.Intena nuevamente.');}
     
      })
      .catch(error => {console.log(error)
        this.toast.error('Hubo un error.Intena nuevamente.');
      });


  }

  // private checkUserIsVerified(user: UserApp) {
  //   if (user) {
  //     this.router.navigate(['/main']);
  //   }
  //    else {
  //     this.router.navigate(['/registro']);
  //   }
  // }

}
