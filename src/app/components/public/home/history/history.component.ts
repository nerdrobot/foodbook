import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrderService} from "~/app/services/shared/order.service";

@Component({
  selector: 'ns-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {
    history;
    historySubscription: Subscription;

    constructor(private orderService: OrderService) {
    }

    ngOnInit(): void {
        this.historySubscription =  this.orderService.order.subscribe(order => {
            console.log(order);
            this.history = order
        });
    }

    ngOnDestroy(): void {
        if (this.historySubscription) {
            this.historySubscription.unsubscribe();
        }
    }

}
