import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import { selectAllWidgets, selectCurrentWidget } from '..';
import { WidgetsActionTypes } from './widgets.actions';
import * as WidgetsActions from './widgets.actions';
import { WidgetsState } from './widgets.reducer';

@Injectable({
  providedIn: 'root'
})
export class WidgetsFacade {
  allWidgets$ = this.store.pipe(select(selectAllWidgets));
  currentWidget$ = this.store.pipe(select(selectCurrentWidget));

  mutations$ = this.actions$.pipe(
    filter(action =>
      action.type === WidgetsActionTypes.AddWidget
      || action.type === WidgetsActionTypes.UpdateWidget
      || action.type === WidgetsActionTypes.DeleteWidget
    )
  );

  constructor(private store: Store<WidgetsState>, private actions$: ActionsSubject) {}

  selectWidget(widgetId) {
    this.store.dispatch(new WidgetsActions.WidgetSelected(widgetId));
  }

  loadAll() {
    this.store.dispatch(new WidgetsActions.LoadWidgets());
  }

  addWidget(widget) {
    this.store.dispatch(new WidgetsActions.AddWidget(widget));
  }

  updateWidget(widget) {
    this.store.dispatch(new WidgetsActions.UpdateWidget(widget));
  }

  deleteWidget(widget) {
    this.store.dispatch(new WidgetsActions.DeleteWidget(widget));
  }
}
