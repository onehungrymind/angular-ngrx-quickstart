import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromItems from './items.reducer';

export interface ItemsState {
  items: fromItems.ItemsState;
}

export const reducers: ActionReducerMap<ItemsState> = {
  items: fromItems.itemsReducer,
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
