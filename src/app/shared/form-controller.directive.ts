import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appFormController]'
})
export class FormControllerDirective implements OnInit {

  @Input()
  private type: string;

  private inputTemplate; // <input type=? />

  constructor(private el: ElementRef, private renderer2: Renderer2) { }

  ngOnInit() {
    this.inputTemplate = this.renderer2.createElement('input');
    this.checkType();
  }

  checkType() {
  
    console.log(this.type);
    

    if(this.type.toLowerCase() === 'text') {
      this.renderer2.setAttribute(this.inputTemplate, 'type', 'text');
      this.renderer2.addClass(this.inputTemplate, 'form-control');
    } else if(this.type.toLowerCase() === 'number') {
      this.renderer2.setAttribute(this.inputTemplate, 'type', 'number');
      this.renderer2.addClass(this.inputTemplate, 'form-control');
    } else {
      this.inputTemplate.innerHTML = 'Yes';
      this.renderer2.setAttribute(this.inputTemplate, 'type', 'radio');
      
    }

    this.renderer2.appendChild(this.el.nativeElement, this.inputTemplate);

  }

}
