import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {RadSideDrawerComponent} from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import {RadSideDrawer} from 'nativescript-ui-sidedrawer';
import {UIService} from "~/app/services/shared/ui.service";


@Component({
    selector: 'ns-app',
    moduleId: module.id,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent, {static: false}) drawerComponent: RadSideDrawerComponent;
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;
    private publicView;

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
        this.uiService.isPublicUser.subscribe(value => {
            this.publicView = value;
        })
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.uiService.isPublicUser.subscribe(value => {
            this.publicView = value;
        })

        this.changeDetectionRef.detectChanges();
    }

    toggleDrawer() {
        this.uiService.toggleDrawer();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }

    logout() {
        this.uiService.setPublicUserSubject(true);
    }
}
