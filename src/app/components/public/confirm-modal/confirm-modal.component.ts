import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDialogParams} from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'ns-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

    form: FormGroup;
    date: Date;
    time: Date;

    constructor(private modalDialogParams: ModalDialogParams) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'firstName': new FormControl('', {updateOn: "blur", validators: Validators.required}),
            'lastName': new FormControl('', {updateOn: "blur", validators: Validators.required}),
            'phone': new FormControl('', {updateOn: "blur", validators: Validators.required})
        })
    }

    onSubmit() {
        let time = new Date();
        time.setDate(this.date.getDate());
        time.setHours(this.time.getHours());
        time.setMinutes(this.time.getMinutes());
        let userInformation = Object.assign({}, this.form.value);
        userInformation.time = time;
        this.modalDialogParams.closeCallback(userInformation);
    }
}
