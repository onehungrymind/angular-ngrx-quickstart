import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromItems from './items/items.reducer';
import * as fromWidgets from './widgets/widgets.reducer';

export interface AppState {
  items: fromItems.ItemsState;
  widgets: fromWidgets.WidgetsState;
}

export const reducers: ActionReducerMap<AppState> = {
  items: fromItems.itemsReducer,
  widgets: fromWidgets.widgetsReducer
};

// -------------------------------------------------------------------
// ITEMS SELECTORS
// -------------------------------------------------------------------
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
  (itemEntities, itemId) => {
    const emptyItem = { id: null, name: '', price: 0, description: '' };
    return itemId ? itemEntities[itemId] : emptyItem;
  }
);

// -------------------------------------------------------------------
// WIDGETS SELECTORS
// -------------------------------------------------------------------
export const selectWidgetsState = createFeatureSelector<fromWidgets.WidgetsState>('widgets');

export const selectWidgetIds = createSelector(
  selectWidgetsState,
  fromWidgets.selectWidgetIds
)

export const selectWidgetEntities = createSelector(
  selectWidgetsState,
  fromWidgets.selectWidgetEntities
)

export const selectAllWidgets = createSelector(
  selectWidgetsState,
  fromWidgets.selectAllWidgets
)
