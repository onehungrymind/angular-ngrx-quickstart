import { Component, Input, OnInit } from '@angular/core';
import { Widget } from '@workspace/common-data';

@Component({
  selector: 'app-widgets-total',
  templateUrl: './widgets-total.component.html',
  styleUrls: ['./widgets-total.component.css']
})
export class WidgetsTotalComponent implements OnInit {
  @Input() widgets: Widget[];

  constructor() { }

  ngOnInit() {
  }

}
