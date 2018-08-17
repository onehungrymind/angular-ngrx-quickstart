import { select, Store } from '@ngrx/store';
import { ItemsActionTypes } from '../../../../../libs/common-data/src/lib/state/items.actions';
import * as ItemsActions from '../../../../../libs/common-data/src/lib/state/items.actions';
import { ItemsState } from '../../../../../libs/common-data/src/lib/state/items.reducer';
import { Component, OnInit } from '@angular/core';
import { Item, ItemsService, Widget, WidgetsService } from '@workspace/common-data';
import { selectAllItems } from '../../../../../libs/common-data/src/lib/state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  items: Item[];
  widgets: Widget[];

  constructor(private itemsService: ItemsService,
              private widgetsService: WidgetsService,
              private store: Store<ItemsState>
            ) {
  }

  ngOnInit() {
    this.getItems();
    this.getWidgets();
  }

  getItems() {
    this.store.pipe(select(selectAllItems))
      .subscribe(items => this.items = items);

    this.store.dispatch(new ItemsActions.LoadItems());
  }

  getWidgets() {
    this.widgetsService.all()
      .subscribe((widgets: Widget[]) => this.widgets = widgets);
  }
}
