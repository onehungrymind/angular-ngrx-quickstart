import { Component, Input, OnInit } from '@angular/core';
import { Item } from '@workspace/common-data';

@Component({
  selector: 'app-items-total',
  templateUrl: './items-total.component.html',
  styleUrls: ['./items-total.component.css']
})
export class ItemsTotalComponent implements OnInit {
  @Input() items: Item;

  constructor() { }

  ngOnInit() {
  }

}
