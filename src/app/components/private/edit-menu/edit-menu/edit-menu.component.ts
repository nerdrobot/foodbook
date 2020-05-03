import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'ns-edit-menu',
    templateUrl: './edit-menu.component.html',
    styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {

    form: FormGroup;
    constructor(private modalDialogParams:ModalDialogParams) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'name': new FormControl(this.modalDialogParams.context, {updateOn: "change", validators: [Validators.required]})
        })
    }

    submit() {
        this.modalDialogParams.closeCallback(this.form.get('name').value);
    }

}
