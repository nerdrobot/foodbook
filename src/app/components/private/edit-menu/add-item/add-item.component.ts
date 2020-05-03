import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalDialogParams} from "nativescript-angular/modal-dialog";

@Component({
  selector: 'ns-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

    form: FormGroup;

  constructor(private  modalDialogParams:ModalDialogParams) { }

  ngOnInit(): void {
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
