import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private orderSubject = new BehaviorSubject(null);
    public order = this.orderSubject.asObservable();

    constructor() {
    }

    updateOrder(order) {
        this.orderSubject.next(order);
    }
}
