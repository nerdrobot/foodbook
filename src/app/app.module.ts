import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {AuthComponent} from './components/private/auth/auth.component';
import {NativeScriptFormsModule} from 'nativescript-angular/forms';
import {MainComponent} from './components/public/layout/main/main.component';
import {ActionBarComponent} from './components/shared/ui/action-bar/action-bar.component';
import {NativeScriptUISideDrawerModule} from "nativescript-ui-sidedrawer/angular";
import {HomeComponent} from './components/public/home/home.component';
import {SearchRestaurantsComponent} from './components/public/search-restaurants/search-restaurants.component';
import {CartComponent} from './components/public/cart/cart.component';
import {NativeScriptDateTimePickerModule} from "nativescript-datetimepicker/angular";


import {MenuComponent} from './components/public/home/menu/menu.component';
import {CategoriesComponent} from './components/public/home/categories/categories.component';
import {ReactiveFormsModule} from '@angular/forms';
import {registerElement} from 'nativescript-angular/element-registry';
import {CardView} from "nativescript-cardview";
import {CommonModule} from "@angular/common";
import {OrdersComponent} from './components/private/orders/orders.component';
import {HistoryComponent} from "~/app/components/public/home/history/history.component";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {HttpClientModule} from "@angular/common/http";
import {ConfirmModalComponent} from './components/public/confirm-modal/confirm-modal.component'
import {ModalDialogService} from "nativescript-angular/modal-dialog";
import {ProfileComponent} from './components/private/profile/profile.component';
import {EditRestaurantComponent} from './components/private/edit-restaurant/edit-restaurant.component';
import {ShowMenuComponent} from './components/private/show-menu/show-menu.component';
import {EditMenuComponent} from "~/app/components/private/edit-menu/edit-menu/edit-menu.component";
import {NameComponent} from './components/private/edit-menu/name/name.component';
import {EditItemComponent} from "~/app/components/private/edit-menu/edit-item/edit-item.component";
import {AddItemComponent} from "~/app/components/private/edit-menu/add-item/add-item.component";
import { AddMenuComponent } from './components/private/edit-menu/add-menu/add-menu.component';

registerElement("CardView", () => CardView);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptUISideDrawerModule,
        ReactiveFormsModule,
        CommonModule,
        NativeScriptUIListViewModule,
        HttpClientModule,
        NativeScriptDateTimePickerModule
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
        OrdersComponent,
        HistoryComponent,
        ConfirmModalComponent,
        ProfileComponent,
        EditRestaurantComponent,
        ShowMenuComponent,
        EditMenuComponent,
        EditItemComponent,
        NameComponent,
        AddItemComponent,
        AddMenuComponent
    ],
    providers: [ModalDialogService],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    entryComponents: [ConfirmModalComponent, EditItemComponent, NameComponent, AddItemComponent, EditMenuComponent, AddMenuComponent]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
}
