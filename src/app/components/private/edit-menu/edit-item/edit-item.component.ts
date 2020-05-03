import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
    selector: 'ns-item',
    templateUrl: './edit-item.component.html',
    styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

    form: FormGroup;
    constructor(private  modalDialogParams:ModalDialogParams) {
    }

    ngOnInit(): void {
        console.log(this.modalDialogParams.context);
        this.form = new FormGroup({
            'name': new FormControl(this.modalDialogParams.context.name, {updateOn: "change", validators: [Validators.required]}),
            'price': new FormControl(this.modalDialogParams.context.price, {updateOn: "change", validators: [Validators.required]}),
        })
    }

    onSubmit() {
        const item = Object.assign({}, this.form.value);
        this.modalDialogParams.closeCallback(item);
    }

}
