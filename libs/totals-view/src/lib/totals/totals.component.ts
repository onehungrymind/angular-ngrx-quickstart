import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit, OnChanges {
  total: number;
  @Input() collection: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName of Object.keys(changes)) {
      const change = changes[propName];

      if(propName === 'collection' && change.currentValue) {
        this.total = this.computeTotal(change.currentValue);
      }
    }
  }

  computeTotal(collection) {
    return collection.reduce((acc, curr) => acc + parseInt(curr.price, 10), 0);
  }
}
