import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {RouterExtensions} from 'nativescript-angular/router';
import {TextField} from 'tns-core-modules/ui/text-field';

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    emailControlIsValid = true;
    passwordControlIsValid = true;
    @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;
    @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;

    constructor(private router: RouterExtensions) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.email]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.minLength(6)]
            })
        });
    }

    onSignin() {
        this.router.navigate(['/today'], {clearHistory: true});
    }

    onSubmit() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.router.navigate(['/searchRestaurant'], {clearHistory: true});
    }
}
