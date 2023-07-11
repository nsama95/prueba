import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OrderAuthguardService implements CanActivate {
  userId: string;
  isAdmin: boolean;
  isEmployee:boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private orderService: OrderService,
    private toast: ToastrService
  ) {
    this.auth.user$.subscribe((u) => {
      this.userId = u?.uid;
    });
    this.auth.appUser$.subscribe((u) => {
      this.isAdmin = u?.isAdmin;
    });
    this.auth.appUser$.subscribe((u) => {
      this.isEmployee = u?.isEmployee;
    });
  }

  async canActivate(route: ActivatedRouteSnapshot) {
    let orderId = await this.orderService.getOrderUserId(route);
console.log(this.isAdmin);
    if (orderId === this.userId || this.isAdmin || this.isEmployee ) {
      return true;
    } else {
      this.router.navigate(['/']);
      this.toast.error('No tenes acceso.');
      return false;
    }
  }
}
