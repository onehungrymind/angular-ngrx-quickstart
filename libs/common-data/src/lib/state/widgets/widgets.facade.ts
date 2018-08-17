import { Injectable } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { WidgetsState } from './widgets.reducer';
import { WidgetsActionTypes } from './widgets.actions';
import { selectAllWidgets } from '../index';
import * as WidgetsActions from './widgets.actions';

@Injectable({
  providedIn: 'root'
})
export class WidgetsFacade {
  allWidgets$ = this.store.pipe(select(selectAllWidgets));
  mutations$ = this.actions$.pipe(
    filter(action =>
      action.type === WidgetsActionTypes.AddWidget
      || action.type === WidgetsActionTypes.UpdateWidget
      || action.type === WidgetsActionTypes.DeleteWidget
    )
  );

  constructor(private store: Store<WidgetsState>, private actions$: ActionsSubject) {}

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
