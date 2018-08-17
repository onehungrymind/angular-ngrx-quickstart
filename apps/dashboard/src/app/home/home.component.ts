import { Component, OnInit } from '@angular/core';
import { Item, ItemsFacade, Widget, WidgetsFacade } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  items$: Observable<Item[]> = this.itemsFacade.allItems$;
  widgets$: Observable<Widget[]> = this.widgetsFacade.allWidgets$;

  constructor(
    private itemsFacade: ItemsFacade,
    private widgetsFacade: WidgetsFacade
  ) {}

  ngOnInit() {
    this.itemsFacade.loadAll();
    this.widgetsFacade.loadAll();
  }
}
