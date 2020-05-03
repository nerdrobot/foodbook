import {Component, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestaurantService} from "~/app/services/shared/restaurant.service";
import {TextField} from "tns-core-modules/ui/text-field";
import {RouterExtensions} from "nativescript-angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "~/app/components/private/auth/auth.service";
import {Restaurant} from "~/app/models/restaurant";

@Component({
    selector: 'ns-edit-restaurant',
    templateUrl: './edit-restaurant.component.html',
    styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit, OnDestroy {

    form: FormGroup;
    restaurants: Restaurant[];
    user;
    selectedRestaurant: Restaurant;
    isLoading = false;
    showBackButton = true
    ref: ComponentRef<any>;

    @ViewChild('nameEl', {static: false}) nameEl: ElementRef<TextField>;
    @ViewChild('addressEl', {static: false}) addressEl: ElementRef<TextField>;
    @ViewChild('phoneEl', {static: false}) phoneEl: ElementRef<TextField>;
    restaurantSubscription: Subscription;

    constructor(private restaurantService: RestaurantService, private router: RouterExtensions, private authService: AuthService) {
        this.authService.user.subscribe(user => this.user = user);
    }

    get canGoBack() {
        return this.router.canGoBack() && this.showBackButton;
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'name': new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required]
            }),
            'address': new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required]
            }),
            'phone': new FormControl(null, {
                updateOn: "blur",
                validators: [Validators.required]
            })
        });
        this.restaurantSubscription = this.restaurantService.getRestaurant().subscribe(restaurants => {
                this.restaurants = restaurants;
                for (let restaurant of restaurants) {
                    console.log(restaurant);
                    console.log(this.user);
                    console.log('email', restaurant.managerEmail);
                    if (restaurant.managerEmail == this.user.email) {
                        console.log('true manager email == user email');
                        this.selectedRestaurant = restaurant;
                    }
                }
            },
            () => {
            },
            () => {
                this.setName();
                this.setAddress();
                this.setPhone();
            });
    }

    ngOnDestroy(): void {
        if (this.restaurantSubscription)
            this.restaurantSubscription.unsubscribe();
    }

    setName() {
        console.log('setName', this.selectedRestaurant);
        this.form.get('name').setValue(this.selectedRestaurant.name);
    }

    setAddress() {
        console.log('setAddress');
        this.form.get('address').setValue(this.selectedRestaurant.address);
    }

    setPhone() {
        console.log('setPhone');
        this.form.get('phone').setValue(this.selectedRestaurant.phone);
    }

    onSubmit() {
        this.nameEl.nativeElement.focus();
        this.addressEl.nativeElement.focus();
        this.phoneEl.nativeElement.dismissSoftInput();
        const name = this.form.get('name').value;
        const address = this.form.get('address').value;
        const phone = this.form.get('phone').value;

        this.selectedRestaurant.name = name;
        this.selectedRestaurant.address = address;
        this.selectedRestaurant.phone = phone;

        // const index = this.restaurants.indexOf(this.selectedRestaurant);
        // this.restaurants[index] = this.selectedRestaurant;
        console.log(this.restaurants);
        /*  this.restaurantService.updateRestaurant(this.restaurants).subscribe(() => {
              this.isLoading = false;
          }, () => this.isLoading = false);*/
        this.router.navigate(['/profile']);
        this.ref.destroy();
    }

    onGoBack() {
        this.router.backToPreviousPage();
    }

}
