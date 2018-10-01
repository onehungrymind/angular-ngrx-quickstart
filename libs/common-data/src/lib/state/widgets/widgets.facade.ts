import { Injectable } from '@angular/core';
import { select, Store, ActionsSubject } from '@ngrx/store';

import { selectAllWidgets, selectCurrentWidget } from './..';
import * as WidgetsActions from './widgets.actions';
import { WidgetsState } from './widgets.reducer';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WidgetsFacade {
  allWidgets$ = this.store.pipe(select(selectAllWidgets));
  currentWidget$ = this.store.pipe(select(selectCurrentWidget));
  mutations$ = this.actions$.pipe(
    filter(
      action =>
        action.type === WidgetsActions.WidgetsActionTypes.AddWidget ||
        action.type === WidgetsActions.WidgetsActionTypes.UpdateWidget ||
        action.type === WidgetsActions.WidgetsActionTypes.DeleteWidget
    )
  );

  constructor(
    private store: Store<WidgetsState>,
    private actions$: ActionsSubject
  ) {}

  selectWidget(widgetId) {
    this.store.dispatch(new WidgetsActions.SelectWidget(widgetId));
  }

  loadAll() {
    this.store.dispatch(new WidgetsActions.LoadWidgets());
  }

  createWidget(widget) {
    this.store.dispatch(new WidgetsActions.AddWidget(widget));
  }

  updateWidget(widget) {
    this.store.dispatch(new WidgetsActions.UpdateWidget(widget));
  }

  deleteWidget(widget) {
    this.store.dispatch(new WidgetsActions.DeleteWidget(widget));
  }
}
