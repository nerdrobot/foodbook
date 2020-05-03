import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDialogParams} from "nativescript-angular/modal-dialog";

@Component({
  selector: 'ns-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
    form: FormGroup;
    constructor(private modalDialogParams:ModalDialogParams) {
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            'name': new FormControl('', {updateOn: "change", validators: [Validators.required]})
        })
    }

    submit() {
        this.modalDialogParams.closeCallback(this.form.get('name').value);
    }
}
