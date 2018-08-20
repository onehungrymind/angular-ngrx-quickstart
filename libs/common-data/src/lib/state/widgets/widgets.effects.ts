import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';

import { Widget } from '../../core/widgets/widget.model';
import { WidgetsService } from '../../core/widgets/widgets.service';
import {
  AddWidget,
  DeleteWidget,
  LoadWidgets,
  UpdateWidget,
  WidgetAdded,
  WidgetDeleted,
  WidgetsActionTypes,
  WidgetsLoaded,
  WidgetUpdated,
} from './widgets.actions';
import { WidgetsState } from './widgets.reducer';

@Injectable({providedIn: 'root'})
export class WidgetsEffects {
  @Effect() effect$ = this.actions$.ofType(WidgetsActionTypes.WidgetsAction);

  @Effect()
  loadWidgets$ = this.dataPersistence.fetch(WidgetsActionTypes.LoadWidgets, {
    run: (action: LoadWidgets, state: WidgetsState) => {
      return this.widgetsService.all().pipe(map((res: Widget[]) => new WidgetsLoaded(res)))
    },

    onError: (action: LoadWidgets, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  addWidget$ = this.dataPersistence.pessimisticUpdate(WidgetsActionTypes.AddWidget, {
    run: (action: AddWidget, state: WidgetsState) => {
      return this.widgetsService.create(action.payload).pipe(map((res: Widget) => new WidgetAdded(res)))
    },

    onError: (action: AddWidget, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  updateWidget$ = this.dataPersistence.pessimisticUpdate(WidgetsActionTypes.UpdateWidget, {
    run: (action: UpdateWidget, state: WidgetsState) => {
      return this.widgetsService.update(action.payload).pipe(map((res: Widget) => new WidgetUpdated(res)))
    },

    onError: (action: UpdateWidget, error) => {
      console.error('Error', error);
    }
  });

  @Effect()
  deleteWidget$ = this.dataPersistence.pessimisticUpdate(WidgetsActionTypes.DeleteWidget, {
    run: (action: DeleteWidget, state: WidgetsState) => {
      return this.widgetsService.delete(action.payload).pipe(map(_ => new WidgetDeleted(action.payload)))
    },

    onError: (action: DeleteWidget, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<WidgetsState>,
    private widgetsService: WidgetsService
  ) {}
}
