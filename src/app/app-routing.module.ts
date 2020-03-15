import {NgModule} from "@angular/core";
import {NativeScriptRouterModule} from "nativescript-angular/router";
import {Routes} from "@angular/router";
import {AuthComponent} from "~/app/components/auth/auth.component";
import {MainComponent} from "~/app/components/public/layout/main/main.component";
import {HomeComponent} from "~/app/components/public/home/home.component";
import {SearchRestaurantsComponent} from "~/app/components/public/search-restaurants/search-restaurants.component";
import {CartComponent} from "~/app/components/public/cart/cart.component";
import {MenuComponent} from "~/app/components/public/home/menu/menu.component";
import {CategoriesComponent} from "~/app/components/public/home/categories/categories.component";
import {PromosComponent} from "~/app/components/public/home/promos/promos.component";
import {OrdersComponent} from "~/app/components/orders/orders.component";

const routes: Routes = [
    {path: '', component: AuthComponent},
    {path: 'main', component: MainComponent},
    {path: 'searchRestaurant', component: SearchRestaurantsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'home', component: HomeComponent},
    {path: 'order', component: OrdersComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
