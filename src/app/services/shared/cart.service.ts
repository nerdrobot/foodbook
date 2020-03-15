import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {OrderService} from "~/app/services/shared/order.service";
import {Order} from "~/app/models/order";

@Injectable({
    providedIn: 'root'
})
export class CartService {
    public cart = [];

    private cartBehaviorSubject = new BehaviorSubject(this.cart);
    public cartItems = this.cartBehaviorSubject.asObservable();

    constructor(private orderService: OrderService) {
    }


    addToCart(item) {
        this.cart.push(item);
        this.cartBehaviorSubject.next(this.cart);
    }

    removeFromCart(item) {
        this.cart.splice(0, item);
        this.cartBehaviorSubject.next(this.cart);
    }

    checkOut(order) {
        this.orderService.updateOrder(order);
        this.cart = [];
        this.cartBehaviorSubject.next(this.cart);
    }
}
