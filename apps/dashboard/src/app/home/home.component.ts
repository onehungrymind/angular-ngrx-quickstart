import { Component, OnInit } from '@angular/core';
import { Item, ItemsFacade, Widget, WidgetsService } from '@workspace/common-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  items$: Observable<Item[]> = this.itemsFacade.allItems$;

  widgets: Widget[];

  constructor(
    private itemsFacade: ItemsFacade,
    private widgetsService: WidgetsService
  ) {}

  ngOnInit() {
    this.itemsFacade.loadAll();
    this.getWidgets();
  }

  getWidgets() {
    this.widgetsService.all()
      .subscribe((widgets: Widget[]) => this.widgets = widgets);
  }
}
