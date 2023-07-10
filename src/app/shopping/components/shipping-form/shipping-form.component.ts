import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from 'shared/models/order';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { ZonasService } from 'shared/services/zonas.service';
import { Zonas } from 'shared/models/zonas';
import { first } from 'rxjs/operators';
import { CategoriesService } from 'shared/services/categories.service';
import { AppUser } from 'shared/models/app-user';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  flagUser=false;
  userSub: Subscription;
  zonas$;
  usersCliente$;
  zonaFinal: Zonas = {
    name: '',
    price:0,
    id:''
  };
  ;
  pago:any={};


userLogeado:AppUser;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    public zonasServices:ZonasService,
    public categorieServices: CategoriesService
  ) {}

  ngOnInit(): void {
    this.zonas$ = this.zonasServices.getAll();
    this.usersCliente$= this.authService.getAllClientes()/*.subscribe(
      (users) => {
        console.log(users);
        this.usersCliente$=users;
        console.log(this.usersCliente$);
      }
    );*/
    this.userSub = this.authService.user$.subscribe(
      (user) => {


    this.authService.getUser(user.uid).subscribe(
      (user) => {
        if(user.isAdmin || user.isEmployee){
          this.flagUser=true;
            this.userId=null;
        }else{
          this.flagUser=false;
          this.userId = user.uid
        }
      }
    );


      }
    );

    console.log(this.usersCliente$);
  }

  async placeOrder() {
    console.log(this.userId);
   // console.log(JSON.stringify(this.shipping));

   /*  await this.zonasServices.get(this.shipping.city).subscribe((p) => {
   // console.log('result',p);
      this.zonaFinal.price=p.price;
      this.zonaFinal.name=p.name;
    });*/
    const p = await new Promise<any>((resolve, reject) => {
      this.zonasServices.get(this.shipping.city).subscribe(
        (result) => resolve(result),
        (error) => reject(error)
      );
    });

    this.shipping.price=p.price;
    this.shipping.city=p.name;
    console.log('cart form'+JSON.stringify(this.shipping));

    let pago= this.categorieServices.createPago(this.pago);
    if(pago){let order = new Order(this.userId, this.shipping,this.cart);
    let result = await this.orderService.placeOrder({ ...order });
   this.router.navigate(['order-success', result.id]);}
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
