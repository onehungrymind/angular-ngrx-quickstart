import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromItems from './items/items.reducer';
import * as fromWidgets from './widgets/widgets.reducer';

export interface AppState {
  items: fromItems.ItemsState;
  widgets: fromWidgets.WidgetsState
}

export const reducers: ActionReducerMap<AppState> = {
  items: fromItems.itemsReducer,
  widgets: fromWidgets.widgetsReducer
};

export const selectItemItemsState = createFeatureSelector<fromItems.ItemsState>('items');

export const selectItemIds = createSelector(
  selectItemItemsState,
  fromItems.selectItemIds
);
export const selectItemEntities = createSelector(
  selectItemItemsState,
  fromItems.selectItemEntities
);
export const selectAllItems = createSelector(
  selectItemItemsState,
  fromItems.selectAllItems
);
export const selectItemTotal = createSelector(
  selectItemItemsState,
  fromItems.selectItemTotal
);
export const selectCurrentItemId = createSelector(
  selectItemItemsState,
  fromItems.getSelectedItemId
);

export const selectCurrentItem = createSelector(
  selectItemEntities,
  selectCurrentItemId,
  (itemEntities, itemId) => itemEntities[itemId]
);

export const selectWidgetWidgetsState = createFeatureSelector<fromWidgets.WidgetsState>('widgets');

export const selectWidgetIds = createSelector(
  selectWidgetWidgetsState,
  fromWidgets.selectWidgetIds
);
export const selectWidgetEntities = createSelector(
  selectWidgetWidgetsState,
  fromWidgets.selectWidgetEntities
);
export const selectAllWidgets = createSelector(
  selectWidgetWidgetsState,
  fromWidgets.selectAllWidgets
);
export const selectWidgetTotal = createSelector(
  selectWidgetWidgetsState,
  fromWidgets.selectWidgetTotal
);
export const selectCurrentWidgetId = createSelector(
  selectWidgetWidgetsState,
  fromWidgets.getSelectedWidgetId
);

export const selectCurrentWidget = createSelector(
  selectWidgetEntities,
  selectCurrentWidgetId,
  (widgetEntities, widgetId) => widgetEntities[widgetId]
);
