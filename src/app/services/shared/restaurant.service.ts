import {Injectable} from '@angular/core';
import {Restaurant} from "~/app/models/restaurant";
import {BehaviorSubject, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    restaurants: Array<Restaurant> = [
        {
            id: 1,
            name: 'Burger King',
            menu: [
                {
                    id: 0,
                    name: 'breakfast',
                    items: [{name: 'sausage', price: 1.00}, {name: 'hot dogs', price: 1.50}]
                },
                {
                    id: 1,
                    name: 'lunch',
                    items: [{name: 'burger', price: 2.50}, {name: 'fries', price: 5.50}]
                },
                {
                    id: 2,
                    name: 'dinner',
                    items: [{name: 'shake', price: 1.99}]
                }
            ]
        },
        {
            id: 2,
            name: 'Super Shawarma',
            menu: [
                {
                    id: 0,
                    name: 'breakfast',
                    items: [{name: 'omelet', price: 2.99}, {name: 'french-toast', price: 1.50}]
                },
                {
                    id: 1,
                    name: 'lunch',
                    items: [{name: 'Biryani', price: 7.99}]
                },
                {
                    id: 2,
                    name: 'dinner',
                    items: [{name: 'Greek Sandwich', price: 6.99}]
                }
            ]
        }
    ];

    private selectedRestaurantBehaviorSubject = new BehaviorSubject(null);
    public selectedRestaurant = this.selectedRestaurantBehaviorSubject.asObservable();

    constructor() {
    }

    get() {
        return of(this.restaurants);
    }

    setSelectedRestaurant(restaurant: any) {
        this.selectedRestaurantBehaviorSubject.next(restaurant);
    }
}
