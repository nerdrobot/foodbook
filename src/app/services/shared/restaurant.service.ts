import {Injectable} from '@angular/core';
import {Restaurant} from "~/app/models/restaurant";
import {BehaviorSubject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class RestaurantService {

    selectedRestaurantBehaviorSubject = new BehaviorSubject(null);
    public
    selectedRestaurant = this.selectedRestaurantBehaviorSubject.asObservable();

    private
    categoryFilterBehaviorSubject = new BehaviorSubject(null);
    categoryFilter = this.categoryFilterBehaviorSubject.asObservable();


    constructor(private httpClient: HttpClient) {
    }

    setSelectedRestaurant(restaurant: any) {
        this.selectedRestaurantBehaviorSubject.next(restaurant);
    }

    updateRestaurant(restaurants: Restaurant[]) {
        return this.httpClient.put('https://senior-project-a8f9f.firebaseio.com/restaurants.json', restaurants);
    }

    getRestaurant() {
        return this.httpClient.get<Restaurant[]>('https://senior-project-a8f9f.firebaseio.com/restaurants.json');
    }

    setFilterCategory(name: string, empty ?: boolean) {
        if (empty)
            this.categoryFilterBehaviorSubject.next(null)
        if (!empty)
            this.categoryFilterBehaviorSubject.next(name);
    }
}
