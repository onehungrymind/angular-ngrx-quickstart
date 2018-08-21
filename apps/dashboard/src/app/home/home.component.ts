import { Component, OnInit } from '@angular/core';
import { Item, ItemsFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  items$: Observable<Item[]> = this.itemsFacade.allItems$;

  constructor(
    private itemsFacade: ItemsFacade
  ) {}

  ngOnInit() {
    this.itemsFacade.loadAll();
  }
}
