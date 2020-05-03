import {Component, OnInit} from '@angular/core';
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {AuthService} from "~/app/components/private/auth/auth.service";
import {Restaurant} from "~/app/models/restaurant";

@Component({
    selector: 'ns-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    restaurants: Restaurant[];
    user;
    restaurant: Restaurant;

    constructor(private restaurantService: RestaurantService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.user.subscribe(user => this.user = user);
        this.restaurantService.getRestaurant().subscribe(restaurants => {
                this.restaurants = restaurants;
                for (let restaurant of restaurants) {
                    if (restaurant.managerEmail == this.user.email) {
                        this.restaurant = restaurant;
                    }
                }
            }
        );
    }
}
