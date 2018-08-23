import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllItems, selectCurrentItem } from '..';
import { ItemsActionTypes } from './items.actions';
import * as ItemsActions from './items.actions';
import { ItemsState } from './items.reducer';

@Injectable({
  providedIn: 'root'
})
export class ItemsFacade {
  allItems$ = this.store.pipe(select(selectAllItems));
  currentItem$ = this.store.pipe(select(selectCurrentItem));

  mutations$ = this.actions$
    .pipe(
      filter(action =>
        action.type === ItemsActionTypes.AddItem
        || action.type === ItemsActionTypes.UpdateItem
        || action.type === ItemsActionTypes.DeleteItem
      )
    );

  constructor(private store: Store<ItemsState>, private actions$: ActionsSubject) {}

  selectItem(itemId) {
    this.store.dispatch(new ItemsActions.ItemSelected(itemId));
  }

  loadAll() {
    this.store.dispatch(new ItemsActions.LoadItems());
  }

  addItem(item) {
    this.store.dispatch(new ItemsActions.AddItem(item));
  }

  updateItem(item) {
    this.store.dispatch(new ItemsActions.UpdateItem(item));
  }

  deleteItem(item) {
    this.store.dispatch(new ItemsActions.DeleteItem(item));
  }
}
