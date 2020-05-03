import {Component, OnDestroy, OnInit, ViewContainerRef} from '@angular/core';
import {CartService} from "~/app/services/shared/cart.service";
import {Subscription} from "rxjs";
import {ModalDialogService} from 'nativescript-angular/modal-dialog'
import {ConfirmModalComponent} from "~/app/components/public/confirm-modal/confirm-modal.component";
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {Restaurant} from "~/app/models/restaurant";
import {Order} from "~/app/models/order";

@Component({
    selector: 'ns-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    cartItems: any;
    cartSubscription: Subscription;
    restaurantSubscription: Subscription;
    userinformation;
    restaurant: Restaurant;
    restaurants: Restaurant[];
    restaurantIndex;

    constructor(private cartService: CartService, private modalDialog: ModalDialogService, private restaurantService: RestaurantService, private vcRef: ViewContainerRef) {
    }

    ngOnInit(): void {
        this.cartSubscription = this.cartService.cartItems.subscribe(items => {
            this.cartItems = items;
        });

        this.restaurantSubscription = this.restaurantService.getRestaurant().subscribe(restaurant => this.restaurants = restaurant);
        this.restaurantService.selectedRestaurant.subscribe(restaurant => this.restaurant = restaurant, () => {
        }, () => {
            this.restaurantIndex = this.restaurants.findIndex(restaurant => this.restaurant == restaurant);
            console.log(this.restaurantIndex);
        });
    }


    ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
        if (this.restaurantSubscription)
            this.restaurantSubscription.unsubscribe();
    }

    getTotal() {
        let total = 0;
        for (let item of this.cartItems) {
            total += item.price;
        }
        return total;
    }

    checkOut() {
        this.modalDialog.showModal(ConfirmModalComponent, {viewContainerRef: this.vcRef, context: {}})
            .then((response) => {
                this.userinformation = response;
                if (this.restaurant.orders) {
                    let order = new Order();
                    order.items = this.cartItems;
                    order.firstName = this.userinformation.firstName;
                    order.lastName = this.userinformation.lastName;
                    order.phone = this.userinformation.phone;
                    order.time = this.userinformation.time;
                    order.active = true;
                    this.restaurant.orders.push(order);
                } else {
                    let orders = [];
                    let order = new Order();
                    order.items = this.cartItems;
                    order.firstName = this.userinformation.firstName;
                    order.lastName = this.userinformation.lastName;
                    order.phone = this.userinformation.phone;
                    order.time = this.userinformation.time;
                    order.active = true;
                    orders.push(order);
                    this.restaurant.orders = orders;
                }
                let index;
                for (let i = 0; i < this.restaurants.length; i++) {
                    if (this.restaurants[i].name == this.restaurant.name) {
                        index = i;
                    }
                }
                console.log("index", index);
                this.restaurants[index] = this.restaurant;
                this.cartService.checkOut(this.restaurants).subscribe(() => console.log("success"));
            });

    }

    removeItem(item) {
        this.cartService.removeFromCart(item);
    }
}
