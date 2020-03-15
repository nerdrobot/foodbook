import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {Subscription} from "rxjs";
import {CartService} from "~/app/services/shared/cart.service";

@Component({
    selector: 'ns-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
    menus: any;
    restaurantSubscription: Subscription;

    constructor(private restaurantService: RestaurantService, private cartService:CartService) {
    }

    ngOnInit(): void {
        this.restaurantSubscription = this.restaurantService.selectedRestaurant.subscribe(restaurant => {
            this.menus = restaurant.menu;
        });
    }

    addToCart(item) {
        this.cartService.addToCart(item);
    }


    ngOnDestroy(): void {
        this.restaurantSubscription.unsubscribe();
    }
}
