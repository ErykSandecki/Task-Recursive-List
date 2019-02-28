import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent implements OnInit {

  @Input()
  type: string;

  @Input()
  condition: any;

  constructor() { }

  ngOnInit() {
  }

}
