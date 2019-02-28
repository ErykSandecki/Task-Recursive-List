import { Component, OnInit } from "@angular/core";

import { FormInput } from './model/form-inut';
import Swal, { SweetAlertType } from "sweetalert2";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  private parentForm = Array<FormInput>();

  constructor() {
  }

  ngOnInit() {
  }

  private createInput() {
    
    const data = {
      question: '',
      type: 'text',
      subForm: []
    };
    
    this.parentForm.push(data);
    //this.renderSwal('success', 'The form has been added');

  }

  private createSubInput(formInput: FormInput) {
   
    const data = {
      condition: {
        options: this.checkType(formInput.type),
        value: null
      },
      question: '',
      type: 'text',
      parentType: formInput.type,
      subForm: []
    };

    formInput.subForm.push(data);
  }

  private checkType(type: string) {
    
    if(type.toLowerCase() === 'number') {
      return ['Equals', 'Greater than', 'Less than'];
    } 
    return ['Equals'];

  }

  private renderSwal(type: SweetAlertType, title: string) {
    
    Swal.fire({
      type: type,
      title: title,
      showConfirmButton: false,
      timer: 1000
    });

  }

  private deleteParentInput(index: number) {

    this.parentForm.splice(index, 1);

  }

  public deleteSubInput(parent, indexSub: number) {
    
    parent.subForm.splice(indexSub, 1);

  }
}
