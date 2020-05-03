import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "~/app/services/shared/order.service";
import {Subscription} from "rxjs";
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {Restaurant} from "~/app/models/restaurant";
import {AuthService} from "~/app/components/private/auth/auth.service";
import {Order} from "~/app/models/order";

@Component({
    selector: 'ns-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
    orders : Order[];
    orderSubscription: Subscription;

    restaurants: Restaurant[];
    restaurant: Restaurant;
    user;

    constructor(private restaurantService: RestaurantService,  private authService: AuthService) {
        this.authService.user.subscribe(user => this.user = user);
    }

    ngOnInit(): void {
        this.restaurantService.getRestaurant().subscribe(restaurants => {
                this.restaurants = restaurants;
                for (let restaurant of restaurants) {
                    if (restaurant.managerEmail == this.user.email) {
                        this.restaurant = restaurant;
                        this.orders = this.restaurant.orders;
                    }
                }
            }
        );
    }

    ngOnDestroy()
        :
        void {
        if (this.orderSubscription
        ) {
            this.orderSubscription.unsubscribe();
        }


    }

}
