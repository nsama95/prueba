import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { Order } from 'shared/models/order';
import { ZonasService } from 'shared/services/zonas.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css'],
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input() cart: ShoppingCart;
  @Input() total?: number;
  @Input() envio?: string;
  precioZona: number;
  totalConEnvio:number;
  constructor( public zonasServices:ZonasService,) {}

  ngOnInit(): void {
    this.zonasServices.getPrecioZona().subscribe(precio => {
      this.precioZona = precio;
      if(this.precioZona>0)this.totalConEnvio=this.precioZona+this.cart.totalPrice;
    });
    
  }
}
