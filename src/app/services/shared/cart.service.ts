import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderService} from "~/app/services/shared/order.service";
import {HttpClient} from "@angular/common/http";
import {Restaurant} from "~/app/models/restaurant";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cart = [];

    private cartBehaviorSubject = new BehaviorSubject(this.cart);
    public cartItems = this.cartBehaviorSubject.asObservable();

    constructor(private orderService: OrderService, private httpClient: HttpClient) {
    }


    addToCart(item) {
        this.cart.push(item);
        this.cartBehaviorSubject.next(this.cart);
    }

    removeFromCart(index) {
        if (index == 0) {
            this.cart.shift();
        } else {
            this.cart.splice(0, index);
        }
        this.cartBehaviorSubject.next(this.cart);
    }

    checkOut(restaurants: Restaurant[]) {
        console.log('checkout', restaurants);
        this.cart = [];
        this.cartBehaviorSubject.next(this.cart);
        return this.httpClient.put('https://senior-project-a8f9f.firebaseio.com/restaurants.json', restaurants);
    }
}
