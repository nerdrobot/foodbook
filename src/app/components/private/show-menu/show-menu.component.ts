import {ChangeDetectorRef, Component, OnInit, ViewContainerRef} from '@angular/core';
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {AuthService} from "~/app/components/private/auth/auth.service";
import {Restaurant} from "~/app/models/restaurant";
import {Menu} from "~/app/models/menu";
import {ModalDialogService} from "nativescript-angular/modal-dialog";
import {EditItemComponent} from "~/app/components/private/edit-menu/edit-item/edit-item.component";
import {AddItemComponent} from "~/app/components/private/edit-menu/add-item/add-item.component";
import {EditMenuComponent} from "~/app/components/private/edit-menu/edit-menu/edit-menu.component";
import {AddMenuComponent} from "~/app/components/private/edit-menu/add-menu/add-menu.component";

@Component({
    selector: 'ns-show-menu',
    templateUrl: './show-menu.component.html',
    styleUrls: ['./show-menu.component.css']
})
export class ShowMenuComponent implements OnInit {

    restaurants: Restaurant[];
    restaurant: Restaurant;
    restaurantIndex: number;
    menus: Menu[];
    user;

    constructor(private restaurantService: RestaurantService, private changeDetection: ChangeDetectorRef, private authService: AuthService, private modalDialog: ModalDialogService, private vcRef: ViewContainerRef) {
        this.authService.user.subscribe(user => this.user = user);
        this.restaurantService.getRestaurant().subscribe(restaurants => {
                this.restaurants = restaurants;
                for (let restaurant of restaurants) {
                    if (restaurant.managerEmail == this.user.email) {
                        this.restaurant = restaurant;
                        this.menus = restaurant.menu;
                    }
                }
            }, () => {
            },
            () => {
                this.restaurantIndex = this.restaurants.findIndex(restaurant => this.restaurant == restaurant);
            }
        );
    }

    ngOnInit(): void {
    }


    editItem(item, itemIndex, menuIndex) {
        this.modalDialog.showModal(EditItemComponent, {viewContainerRef: this.vcRef, context: item})
            .then((response) => {
                console.log(response);
                this.menus[menuIndex].items[itemIndex] = response;
                this.restaurants[this.restaurantIndex].menu = this.menus;
                console.log(this.restaurants);
                this.restaurantService.updateRestaurant(this.restaurants).subscribe();
            });
    }

    deleteItem(item, itemIndex, menuIndex) {
        this.menus[menuIndex].items.splice(itemIndex, 1);
        this.restaurants[this.restaurantIndex].menu = this.menus;
        this.restaurantService.updateRestaurant(this.restaurants).subscribe();
        this.changeDetection.detectChanges();
    }

    addItem(menuIndex) {
        this.modalDialog.showModal(AddItemComponent, {viewContainerRef: this.vcRef, context: {}})
            .then(response => {
                if (response.name != "" && response.name != null && response.price != "" && response.price != null) {
                    this.menus[menuIndex].items.push(response);
                    this.restaurants[this.restaurantIndex].menu = this.menus;
                    this.restaurantService.updateRestaurant(this.restaurants).subscribe();
                }
            });
    }

    editMenu(menuIndex) {
        this.modalDialog.showModal(EditMenuComponent, {viewContainerRef: this.vcRef, context: this.menus[menuIndex].name})
            .then(response => {
                   this.menus[menuIndex].name = response;
                    this.restaurants[this.restaurantIndex].menu = this.menus;
                    this.restaurantService.updateRestaurant(this.restaurants).subscribe();
                }
            );
    }

    addMenu() {
        this.modalDialog.showModal(AddMenuComponent, {viewContainerRef: this.vcRef, context: {}})
            .then(response => {
                    if (response != null && response != "") {
                        const menu : Menu = new Menu();
                        menu.name = response;
                        this.menus.push(menu);
                        this.restaurants[this.restaurantIndex].menu = this.menus;
                        this.restaurantService.updateRestaurant(this.restaurants).subscribe();
                    }
                }
            );
    }

    deleteMenu(menuIndex) {
        this.menus.splice(menuIndex, 1);
        this.restaurants[this.restaurantIndex].menu = this.menus;
        this.restaurantService.updateRestaurant(this.restaurants).subscribe();
        this.changeDetection.detectChanges();
    }
}
