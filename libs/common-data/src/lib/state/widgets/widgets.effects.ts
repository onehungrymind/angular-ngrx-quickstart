import { Effect, Actions } from '@ngrx/effects';
import { WidgetsActionTypes, LoadWidgets, WidgetsLoaded, AddWidget, WidgetAdded } from './widgets.actions';
import { WidgetsState } from './widgets.reducer';
import { map } from 'rxjs/operators';
import { Widget } from '../../core/widgets/widget.model';
import { DataPersistence } from '@nrwl/nx';
import { WidgetsService } from '../../core/widgets/widgets.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WidgetsEffects {
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

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<WidgetsState>,
    private widgetsService: WidgetsService
  ) { }
}
