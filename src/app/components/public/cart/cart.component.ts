import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartService} from "~/app/services/shared/cart.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'ns-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

    cart: any;
    cartSubscription: Subscription;

    constructor(private cartService: CartService) {
    }

    ngOnInit(): void {
        this.cartSubscription = this.cartService.cartItems.subscribe(items => {
            this.cart = items;
            console.log(this.cart);
        });
    }


    ngOnDestroy(): void {
        if (this.cartSubscription) {
            this.cartSubscription.unsubscribe();
        }
    }

    getTotal() {
        let total = 0;
        for (let item of this.cart) {
            total += item.price;
        }
        return total;
    }

    checkOut() {
        this.cartService.checkOut(this.cart);
    }
}
