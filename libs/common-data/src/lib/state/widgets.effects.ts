import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  WidgetsActions,
  WidgetsActionTypes,
  LoadWidgets,
  WidgetsLoaded, WidgetUpdated, WidgetDeleted, AddWidget, UpdateWidget, DeleteWidget, WidgetAdded
} from './widgets.actions';
import { WidgetsState } from './widgets.reducer';
import { DataPersistence } from '@nrwl/nx';
import { WidgetsService } from '../widgets/widgets.service';
import { map } from 'rxjs/operators';
import { Widget } from '../widgets/widget.model';

@Injectable()
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
