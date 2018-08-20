import { Action } from '@ngrx/store';
import { Widget } from '@workspace/common-data';

export enum WidgetsActionTypes {
  WidgetsAction = '[Widgets] Action',
  WidgetSelected = '[Widgets] Selected',
  LoadWidgets = '[Widgets] Load Data',
  WidgetsLoaded = '[Widgets] Data Loaded',
  AddWidget = '[Widgets] Add Data',
  WidgetAdded = '[Widgets] Data Added',
  UpdateWidget = '[Widgets] Update Data',
  WidgetUpdated = '[Widgets] Data Updated',
  DeleteWidget = '[Widgets] Delete Data',
  WidgetDeleted = '[Widgets] Data Deleted',
}

export class Widgets implements Action {
  readonly type = WidgetsActionTypes.WidgetsAction;
}

export class WidgetSelected implements Action {
  readonly type = WidgetsActionTypes.WidgetSelected;
  constructor(public payload) { }
}

export class LoadWidgets implements Action {
  readonly type = WidgetsActionTypes.LoadWidgets;
  constructor() {}
}

export class WidgetsLoaded implements Action {
  readonly type = WidgetsActionTypes.WidgetsLoaded;
  constructor(public payload: Widget[]) {}
}

export class AddWidget implements Action {
  readonly type = WidgetsActionTypes.AddWidget;
  constructor(public payload: Widget) {}
}

export class WidgetAdded implements Action {
  readonly type = WidgetsActionTypes.WidgetAdded;
  constructor(public payload: Widget) {}
}

export class UpdateWidget implements Action {
  readonly type = WidgetsActionTypes.UpdateWidget;
  constructor(public payload: Widget) {}
}

export class WidgetUpdated implements Action {
  readonly type = WidgetsActionTypes.WidgetUpdated;
  constructor(public payload: Widget) {}
}

export class DeleteWidget implements Action {
  readonly type = WidgetsActionTypes.DeleteWidget;
  constructor(public payload: Widget) {}
}

export class WidgetDeleted implements Action {
  readonly type = WidgetsActionTypes.WidgetDeleted;
  constructor(public payload: Widget) {}
}

export type WidgetsActions = Widgets
  | WidgetSelected
  | LoadWidgets
  | WidgetsLoaded
  | AddWidget
  | WidgetAdded
  | UpdateWidget
  | WidgetUpdated
  | DeleteWidget
  | WidgetDeleted
;
