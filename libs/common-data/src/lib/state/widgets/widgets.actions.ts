import { Widget } from '@workspace/common-data';
import { Action } from '@ngrx/store';

export enum WidgetsActionTypes {
  WidgetSelected = '[Widgets] Selected',
  AddWidget = '[Widgets] Add Data',
  UpdateWidget = '[Widgets] Update Data',
  DeleteWidget = '[Widgets] Delete Data'
}

export class SelectWidget implements Action {
  readonly type = WidgetsActionTypes.WidgetSelected;
  constructor(public payload) { }
}

export class AddWidget implements Action {
  readonly type = WidgetsActionTypes.AddWidget;
  constructor(public payload: Widget) { }
}

export class UpdateWidget implements Action {
  readonly type = WidgetsActionTypes.UpdateWidget;
  constructor(public payload: Widget) { }
}

export class DeleteWidget implements Action {
  readonly type = WidgetsActionTypes.DeleteWidget;
  constructor(public payload: Widget) { }
}

export type WidgetsActions = SelectWidget
  | AddWidget
  | UpdateWidget
  | DeleteWidget
  ;
