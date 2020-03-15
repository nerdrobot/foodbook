import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {Subscription} from "rxjs";
import {RouterExtensions} from 'nativescript-angular/router';

@Component({
    selector: 'ns-search-restaurants',
    templateUrl: './search-restaurants.component.html',
    styleUrls: ['./search-restaurants.component.css']
})
export class SearchRestaurantsComponent implements OnInit, OnDestroy {

    restaurants: any;
    private restaurantSubscription: Subscription;

    constructor(private restaurantService: RestaurantService, private router: RouterExtensions) {
    }

    ngOnInit(): void {
        this.restaurantSubscription = this.restaurantService.get().subscribe((restaurants => this.restaurants = restaurants));
    }

    ngOnDestroy(): void {
        this.restaurantSubscription.unsubscribe();
    }

    selectRestaurant(restaurant) {
        this.restaurantService.setSelectedRestaurant(restaurant);
        this.router.navigate(['/home']);
    }

}
