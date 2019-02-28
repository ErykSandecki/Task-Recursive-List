import { Component, OnInit, Input } from '@angular/core';
import { FormInput } from '../model/form-inut';

@Component({
  selector: 'app-sub-input',
  templateUrl: './sub-input.component.html',
  styleUrls: ['./sub-input.component.scss']
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

  constructor() { 
  }

  ngOnInit() {
  }

  private createSubInput() {
    
    const data = {
      condition: {
        options: this.checkType(this.parentForm.type),
        value: null
      },
      question: '',
      type: 'text',
      parentType: this.parentForm.type,
      subForm: []
    };

    this.parentForm.subForm.push(data);

  }

  private checkType(type: string) {
    
    if(type.toLowerCase() === 'number') {
      return ['Equals', 'Greater than', 'Less than'];
    } 
    return ['Equals'];

  }

  private renderForm() {
    let template: string;
    let type = this.parentForm.type.toLowerCase();
   
    if(type === 'text') {
      template = '<input type="text" />';
    }

    return template;
  }

  public deleteParentInput() {
    
    this.deleteSubInput(this.parent, this.indexSub);

  }

  public deleteSub(parent, indexSub: number) {
    
    parent.subForm.splice(indexSub, 1);

  }

}
