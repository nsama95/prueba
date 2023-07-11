import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit,OnDestroy {
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
  @Output() precioZona: EventEmitter<number> = new EventEmitter<number>();
  pago:any={};
  tarjetaValida = false;

userLogeado:AppUser;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    public zonasServices:ZonasService,
    public categorieServices: CategoriesService,
   private productService: ProductService,
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
  envioPrecio(selectedValue: any) {
    this.zonas$.pipe(first()).subscribe(zonas => {
      const selectedZone = zonas.find(zona => zona.id === this.shipping.city);
      if (selectedZone) {
        const price = selectedZone.price;
        console.log('Precio de envío:', price);
        this.zonasServices.setPrecioZona(price);  
       // this.precioZona.emit(price);
        // Realiza la lógica adicional con el precio de envío aquí
      }
    });

  }
  async placeOrder() {
    console.log(this.userId);
    const p = await new Promise<any>((resolve, reject) => {
      this.zonasServices.get(this.shipping.city).subscribe(
        (result) => resolve(result),
        (error) => reject(error)
      );
    });

    this.shipping.price=p.price;
    this.shipping.city=p.name;
    this.pago.idUser=this.userId;
    console.log('cart form'+JSON.stringify(this.shipping));
    console.log('cart formprod',this.cart);
    let pago= this.categorieServices.createPago(this.pago);
    console.log(pago); 
    if(pago){let order = new Order(this.userId, this.shipping,this.cart);
    let result = await this.orderService.placeOrder({ ...order });
      if(result){
        for(let i = 0; i < this.cart.items.length; i++){
          const product = this.cart.items[i];
          product.product.stock=product.product.stock-product.quantity;
          this.productService.update(product.product,product.product.id);
        }
        }
   this.router.navigate(['order-success', result.id]);
  }
}
  /*
  validateCreditCardNumber(cardNumber: string): boolean {
    // Eliminar los espacios en blanco y guiones
    cardNumber = cardNumber.replace(/\s+/g, '');
    
    // Validar que el número de tarjeta contenga solo dígitos
    if (!/^\d+$/.test(cardNumber)) {
      return false;
    }
    
    let sum = 0;
    let shouldDouble = false;
    
    // Iterar desde el último dígito hacia el primero
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    // La tarjeta es válida si la suma total es un múltiplo de 10
    return (sum % 10) === 0;
  }
  
  validarTarjeta(tarjeta: string) {
    this.tarjetaValida = this.validateCreditCardNumber(tarjeta);
  }*/
  
 ngOnDestroy(){
    this.userSub.unsubscribe();
    this.zonasServices.setPrecioZona(0);
  }

}
