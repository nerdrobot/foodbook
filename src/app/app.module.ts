import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthComponent} from './components/auth/auth.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {MainComponent} from './components/public/layout/main/main.component';
import {ActionBarComponent} from './components/shared/ui/action-bar/action-bar.component';
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {HomeComponent} from './components/public/home/home.component';
import {SearchRestaurantsComponent} from './components/public/search-restaurants/search-restaurants.component';
import {CartComponent} from './components/public/cart/cart.component';

import {MenuComponent} from './components/public/home/menu/menu.component';
import {CategoriesComponent} from './components/public/home/categories/categories.component';
import {PromosComponent} from './components/public/home/promos/promos.component';
import {ReactiveFormsModule} from '@angular/forms';
import {registerElement} from 'nativescript-angular/element-registry';
import {CardView} from "nativescript-cardview";

registerElement("CardView", () => CardView);
import {CommonModule} from "@angular/common";
import {OrdersComponent} from './components/orders/orders.component';
import { HistoryComponent } from './components/public/home/history/history.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        ReactiveFormsModule,
        CommonModule,
    ],
    declarations: [
        AppComponent,
        AuthComponent,
        MainComponent,
        ActionBarComponent,
        HomeComponent,
        SearchRestaurantsComponent,
        CartComponent,
        MenuComponent,
        CategoriesComponent,
        PromosComponent,
        OrdersComponent,
        HistoryComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
}
