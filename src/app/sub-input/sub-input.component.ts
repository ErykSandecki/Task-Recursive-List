import { Component, OnInit, Input } from "@angular/core";
import { FormInput } from "../model/form-inut";

import Swal, { SweetAlertType } from "sweetalert2";

@Component({
  selector: "app-sub-input",
  templateUrl: "./sub-input.component.html",
  styleUrls: ["./sub-input.component.scss"]
})
export class SubInputComponent implements OnInit {
  @Input()
  parentForm: FormInput;

  @Input()
  deleteSubInput: Function;

  @Input()
  parent;

  @Input()
  indexSub: number;

  constructor() {}

  ngOnInit() {}

  private createSubInput() {
    const data = {
      condition: {
        options: this.checkType(this.parentForm.type),
        value: null
      },
      question: "",
      type: "text",
      parentType: this.parentForm.type,
      subForm: []
    };

    this.parentForm.subForm.push(data);
    this.renderSwal('success', 'The form has been added');
  }

  private checkType(type: string) {
    if (type.toLowerCase() === "number") {
      return ["Equals", "Greater than", "Less than"];
    }
    return ["Equals"];
  }

  private renderForm() {
    let template: string;
    let type = this.parentForm.type.toLowerCase();

    if (type === "text") {
      template = '<input type="text" />';
    }

    return template;
  }

  public deleteParentInput() {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this form?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "No",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then(result => {
      if (result.value) {
        this.deleteSubInput(this.parent, this.indexSub);
        this.renderSwal("success", "Form has been delete.");
      } else {
        this.renderSwal("info", "Form is still exists.");
      }
    });
  }

  public deleteSub(parent, indexSub: number) {
    parent.subForm.splice(indexSub, 1);
  }

  private renderSwal(type: SweetAlertType, title: string) {
    Swal.fire({
      type: type,
      title: title,
      showConfirmButton: false,
      timer: 800
    });
  }
}
