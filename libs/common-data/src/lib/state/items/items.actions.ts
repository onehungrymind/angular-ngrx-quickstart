import { Action } from '@ngrx/store';
import { Item } from '@workspace/common-data';

export enum ItemsActionTypes {
  ItemsAction = '[Items] Action',
  ItemSelected = '[Items] Selected',
  LoadItems = '[Items] Load Data',
  ItemsLoaded = '[Items] Data Loaded',
  AddItem = '[Items] Add Data',
  ItemAdded = '[Items] Data Added',
  UpdateItem = '[Items] Update Data',
  ItemUpdated = '[Items] Data Updated',
  DeleteItem = '[Items] Delete Data',
  ItemDeleted = '[Items] Data Deleted',
}

export class Items implements Action {
  readonly type = ItemsActionTypes.ItemsAction;
}

export class ItemSelected implements Action {
  readonly type = ItemsActionTypes.ItemSelected;
  constructor(public payload) { }
}

export class LoadItems implements Action {
  readonly type = ItemsActionTypes.LoadItems;
  constructor() { }
}

export class ItemsLoaded implements Action {
  readonly type = ItemsActionTypes.ItemsLoaded;
  constructor(public payload: Item[]) { }
}

export class AddItem implements Action {
  readonly type = ItemsActionTypes.AddItem;
  constructor(public payload: Item) { }
}

export class ItemAdded implements Action {
  readonly type = ItemsActionTypes.ItemAdded;
  constructor(public payload: Item) { }
}

export class UpdateItem implements Action {
  readonly type = ItemsActionTypes.UpdateItem;
  constructor(public payload: Item) { }
}

export class ItemUpdated implements Action {
  readonly type = ItemsActionTypes.ItemUpdated;
  constructor(public payload: Item) { }
}

export class DeleteItem implements Action {
  readonly type = ItemsActionTypes.DeleteItem;
  constructor(public payload: Item) { }
}

export class ItemDeleted implements Action {
  readonly type = ItemsActionTypes.ItemDeleted;
  constructor(public payload: Item) { }
}

export type ItemsActions = Items
  | ItemSelected
  | LoadItems
  | ItemsLoaded
  | AddItem
  | ItemAdded
  | UpdateItem
  | ItemUpdated
  | DeleteItem
  | ItemDeleted
;
