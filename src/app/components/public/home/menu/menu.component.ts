import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {Subscription} from "rxjs";
import {CartService} from "~/app/services/shared/cart.service";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {Menu} from "~/app/models/menu";

@Component({
    selector: 'ns-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
    menus: Menu[];
    filteredMenu: any;
    restaurantSubscription: Subscription;
    searchPhrase: string;
    category: string;


    constructor(private restaurantService: RestaurantService, private cartService: CartService) {
    }

    ngOnInit(): void {
        this.restaurantService.categoryFilter.subscribe(category => this.category = category);
        this.restaurantSubscription = this.restaurantService.selectedRestaurant.subscribe(restaurant => {
            this.menus = restaurant.menu;
            this.filteredMenu = restaurant.menu;
        });
    }

    addToCart(item) {
        this.cartService.addToCart(item);
    }


    ngOnDestroy(): void {
        this.restaurantSubscription.unsubscribe();
    }

    onSubmit(args) {
        const searchBar = args.object as SearchBar;
        if (searchBar.text !== "") {
            console.log(`Searching for ${searchBar.text}`);
            this.menus = this.filteredMenu.filter((e) => {
                for (let item of e.items) {
                    return item.description.toLowerCase().includes(searchBar.text) || item.name.toLowerCase().includes(searchBar.text) || e.name.toLowerCase().includes(searchBar.text);
                }
            });
        }
    }
    onClear(args) {
        const searchBar = args.object as SearchBar;
        this.menus = this.filteredMenu;
        console.log(`Clear event raised`);
    }
}
