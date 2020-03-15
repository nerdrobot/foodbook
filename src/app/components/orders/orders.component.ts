import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "~/app/services/shared/order.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'ns-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
    orders;
    orderSubscription: Subscription;

    constructor(private orderService: OrderService) {
    }

    ngOnInit(): void {
       this.orderSubscription =  this.orderService.order.subscribe(order => this.orders = order);
    }

    ngOnDestroy(): void {
        if (this.orderSubscription) {
            this.orderSubscription.unsubscribe();
        }
    }

}
