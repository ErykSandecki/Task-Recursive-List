import { Component, OnInit, DoCheck } from "@angular/core";

import { Database } from "./database.service";
import { FormInput } from "./model/form-inut";
import Swal, { SweetAlertType } from "sweetalert2";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, DoCheck {
  private parentForm: Array<FormInput>;

  constructor(private dataBase: Database) {
    this.dataBase.getFormBuilder().subscribe(result => {
      this.parentForm = result;
    });
  }

  ngOnInit() {}

  ngDoCheck() {
    this.dataBase.put(this.parentForm);
  }

  private createInput() {
    const data = {
      question: "",
      type: "text",
      subForm: []
    };

    this.parentForm.push(data);
    this.renderSwal("success", "The form has been added");
  }

  private createSubInput(formInput: FormInput) {
    const data = {
      condition: {
        options: this.checkType(formInput.type),
        value: null
      },
      question: "",
      type: "text",
      parentType: formInput.type,
      subForm: []
    };

    formInput.subForm.push(data);
    this.renderSwal("success", "The form has been added");
  }

  private checkType(type: string) {
    if (type.toLowerCase() === "number") {
      return ["Equals", "Greater than", "Less than"];
    }
    return ["Equals"];
  }

  private deleteParentInput(index: number) {
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
        this.parentForm.splice(index, 1);
        this.renderSwal("success", "Form has been delete.");
      } else {
        this.renderSwal("info", "Form is still exists.");
      }
    });
  }

  public deleteSubInput(parent, indexSub: number) {
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
