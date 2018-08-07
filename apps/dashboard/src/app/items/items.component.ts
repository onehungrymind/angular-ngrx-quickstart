import { Component, OnInit } from '@angular/core';
import { Item, ItemsService } from '@workspace/common-data';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ItemsState } from '../../../../../libs/common-data/src/lib/state/items.reducer';
import * as ItemsActions from '../../../../../libs/common-data/src/lib/state/items.actions';
import { filter, tap } from 'rxjs/operators';
import { ItemsActionTypes } from '../../../../../libs/common-data/src/lib/state/items.actions';
import { selectAllItems } from '../../../../../libs/common-data/src/lib/state';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: Item[];
  currentItem: Item;

  constructor(private itemsService: ItemsService, private store: Store<ItemsState>, private actions$: ActionsSubject) { }

  ngOnInit() {
    this.getItems();
    this.handleActions();
    this.resetCurrentItem();
  }

  handleActions() {
    this.actions$.pipe(
      filter(action =>
        action.type === ItemsActionTypes.AddItem
        || action.type === ItemsActionTypes.UpdateItem
        || action.type === ItemsActionTypes.DeleteItem
      ),
      tap(_ => this.resetCurrentItem())
    )
    .subscribe();
  }

  resetCurrentItem() {
    this.currentItem = { id: null, name: '', price: 0, description: '' };
  }

  selectItem(item) {
    this.currentItem = item;
  }

  cancel(item) {
    this.resetCurrentItem();
  }

  getItems() {
    this.store.pipe(select(selectAllItems))
      .subscribe(items => this.items = items);

    this.store.dispatch(new ItemsActions.LoadItems());
  }

  saveItem(item) {
    if (!item.id) {
      this.store.dispatch(new ItemsActions.AddItem(item));
    } else {
      this.store.dispatch(new ItemsActions.UpdateItem(item));
    }
  }

  deleteItem(item) {
    this.store.dispatch(new ItemsActions.DeleteItem(item));
  }
}
