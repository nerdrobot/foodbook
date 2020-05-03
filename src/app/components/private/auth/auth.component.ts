import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RouterExtensions} from 'nativescript-angular/router';
import {TextField} from 'tns-core-modules/ui/text-field';
import {AuthService} from "~/app/components/private/auth/auth.service";
import {UIService} from "~/app/services/shared/ui.service";

@Component({
    selector: 'ns-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    form: FormGroup;
    isLoading = false;
    @ViewChild('passwordEl', {static: false}) passwordEl: ElementRef<TextField>;
    @ViewChild('emailEl', {static: false}) emailEl: ElementRef<TextField>;

    constructor(private router: RouterExtensions, private uiService: UIService, private authService: AuthService) {
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

    onSubmit() {
        this.emailEl.nativeElement.focus();
        this.passwordEl.nativeElement.focus();
        this.passwordEl.nativeElement.dismissSoftInput();

        const email = this.form.get('email').value;
        const password = this.form.get('password').value;
        this.isLoading = true;
        this.uiService.setPublicUserSubject(false);
        this.authService.login(email, password).subscribe(() => {
            this.isLoading = false;
            this.router.navigate(['/profile'], {clearHistory: true});
        }, () => {
            this.isLoading = false;
        })
    }
}
