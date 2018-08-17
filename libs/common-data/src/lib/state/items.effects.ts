import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  ItemsActions,
  ItemsActionTypes,
  LoadItems,
  ItemsLoaded, ItemUpdated, ItemDeleted, AddItem, UpdateItem, DeleteItem, ItemAdded
} from './items.actions';
import { ItemsState } from './items.reducer';
import { DataPersistence } from '@nrwl/nx';
import { ItemsService } from '../items/items.service';
import { map } from 'rxjs/operators';
import { Item } from '../items/item.model';

@Injectable()
export class ItemsEffects {
  @Effect() effect$ = this.actions$.ofType(ItemsActionTypes.ItemsAction);

  @Effect()
  loadItems$ = this.dataPersistence.fetch(ItemsActionTypes.LoadItems, {
    run: (action: LoadItems, state: ItemsState) => {
      return this.itemsService.all().pipe(map((res: Item[]) => new ItemsLoaded(res)))
    },

    onError: (action: LoadItems, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  addItem$ = this.dataPersistence.pessimisticUpdate(ItemsActionTypes.AddItem, {
    run: (action: AddItem, state: ItemsState) => {
      return this.itemsService.create(action.payload).pipe(map((res: Item) => new ItemAdded(res)))
    },

    onError: (action: AddItem, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  updateItem$ = this.dataPersistence.pessimisticUpdate(ItemsActionTypes.UpdateItem, {
    run: (action: UpdateItem, state: ItemsState) => {
      return this.itemsService.update(action.payload).pipe(map((res: Item) => new ItemUpdated(res)))
    },

    onError: (action: UpdateItem, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  deleteItem$ = this.dataPersistence.pessimisticUpdate(ItemsActionTypes.DeleteItem, {
    run: (action: DeleteItem, state: ItemsState) => {
      return this.itemsService.delete(action.payload).pipe(map(_ => new ItemDeleted(action.payload)))
    },

    onError: (action: DeleteItem, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ItemsState>,
    private itemsService: ItemsService
  ) {}
}