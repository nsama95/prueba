import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { AdminOrdersService } from 'admin/services/admin-orders.service';
import { AdminOrdersTableService } from 'admin/services/admin-orders-table.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  filteredOrders: Order[];
  orders: Order[];
  orderSub: Subscription;
  numEnvio: number;

  @ViewChild('idQuery') idQuery: ElementRef;
  @ViewChild('customerQuery') customerQuery: ElementRef;

  constructor(
    private adminOrdersService: AdminOrdersService,
    private orderService: OrderService,
    public tableService: AdminOrdersTableService
  ) {}

  ngOnInit(): void {
    this.orderSub = this.orderService.getAllOrders().subscribe((orders) => {
      this.orders = orders;

      this.filter();
    });
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  filter() {
    this.tableService.data$.next(
      this.adminOrdersService.filterByCustomer(
        this.adminOrdersService.filterByID(
          this.orders,
          this.idQuery.nativeElement.value
        ),
        this.customerQuery.nativeElement.value
      )
    );
  }
  editState(order :Order,state){
    let stateUpdate;
    switch (state) {
      case 'Realizado':
       stateUpdate = 'Confirmado';

        break;
      case 'Confirmado':
        stateUpdate ='empaquetado';
        break;
      case 'empaquetado':
        stateUpdate = 'enviado' ;
        break;
        case 'enviado al correo':
          stateUpdate = 'enviado' ;
          break;
          case 'enviado':
            stateUpdate = 'enviado' ;
            break;
    };
console.log(stateUpdate);
    this.orderService.updateStateOrder(order,stateUpdate,0);
  }

  editStateAndShipping(order :Order,state){
     this.orderService.updateStateOrder(order,state,this.numEnvio);
     setTimeout(() => {
      console.log('entre');
      this.orderService.updateStateOrder(order,'entregado',this.numEnvio);
  }, 6000);
  }
}
