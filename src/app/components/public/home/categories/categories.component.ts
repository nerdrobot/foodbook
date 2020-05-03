import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {Subscription} from "rxjs";
import {RouterExtensions} from "nativescript-angular/router";

@Component({
    selector: 'ns-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

    menus: any;
    menuSubscription: Subscription;

    constructor(private restaurantService: RestaurantService, private router: RouterExtensions) {
    }

    ngOnInit(): void {
        this.menuSubscription = this.restaurantService.selectedRestaurant.subscribe(restaurant => this.menus = restaurant.menu);
    }

    ngOnDestroy(): void {
        if (this.menuSubscription) {
            this.menuSubscription.unsubscribe();
        }

    }

    filter(menu) {
        this.restaurantService.setFilterCategory(menu.name);
        console.log('filter menu = ', menu.name);
        this.router.navigate(['/home/menu'], {clearHistory: true});
    }

}
