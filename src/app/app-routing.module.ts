import {NgModule} from "@angular/core";
import {NativeScriptRouterModule} from "nativescript-angular/router";
import {Routes} from "@angular/router";
import {MainComponent} from "~/app/components/public/layout/main/main.component";
import {HomeComponent} from "~/app/components/public/home/home.component";
import {SearchRestaurantsComponent} from "~/app/components/public/search-restaurants/search-restaurants.component";
import {CartComponent} from "~/app/components/public/cart/cart.component";
import {OrdersComponent} from "~/app/components/private/orders/orders.component";
import {AuthComponent} from "~/app/components/private/auth/auth.component";
import {ProfileComponent} from "~/app/components/private/profile/profile.component";
import {MenuComponent} from "~/app/components/public/home/menu/menu.component";
import {CategoriesComponent} from "~/app/components/public/home/categories/categories.component";
import {EditRestaurantComponent} from "~/app/components/private/edit-restaurant/edit-restaurant.component";
import {EditMenuComponent} from "~/app/components/private/edit-menu/edit-menu/edit-menu.component";
import {ShowMenuComponent} from "~/app/components/private/show-menu/show-menu.component";

const routes: Routes = [
    {path: '', redirectTo: 'searchRestaurant', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'searchRestaurant', component: SearchRestaurantsComponent},
    {path: 'cart', component: CartComponent},
    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: 'menu', component: MenuComponent
            }
            , {
                path: 'categories', component: CategoriesComponent
            }
        ]
    },
    {path: 'show-order', component: OrdersComponent},
    {path: 'login', component: AuthComponent},
    {path: 'edit-restaurant', component: EditRestaurantComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'edit-menu', component: EditMenuComponent},
    {path: 'show-menu', component: ShowMenuComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
