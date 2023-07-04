import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { AppUser } from 'shared/models/app-user';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
})
export class ShoppingcartComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private shoppingCartService: ShoppingCartService,private userS:AuthService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

  
}
