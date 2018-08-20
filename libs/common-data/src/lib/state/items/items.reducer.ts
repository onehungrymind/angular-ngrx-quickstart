import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Item } from '@workspace/common-data';

import { ItemsActions, ItemsActionTypes } from './items.actions';

/**
 * Interface to the part of the Store containing ItemsState
 * and other information related to ItemsData.
 */
export interface ItemsState extends EntityState<Item> {
  selectedItemId: string | null;
}

export const adapter: EntityAdapter<Item> = createEntityAdapter<Item>();
export const initialState: ItemsState = adapter.getInitialState({
  // additional entity state properties
  selectedItemId: null,
});

export function itemsReducer(
  state = initialState,
  action: ItemsActions
): ItemsState {
  switch (action.type) {
    case ItemsActionTypes.ItemSelected: {
      return Object.assign({}, state, { selectedItemId: action.payload });
    }

    case ItemsActionTypes.ItemsLoaded: {
      return adapter.addAll(action.payload, state);
    }

    case ItemsActionTypes.ItemAdded: {
      return adapter.addOne(action.payload, state);
    }

    case ItemsActionTypes.ItemUpdated: {
      return adapter.upsertOne(action.payload, state);
    }

    case ItemsActionTypes.ItemDeleted: {
      return adapter.removeOne(action.payload.id, state);
    }

    default:
      return state;
  }
}

export const getSelectedItemId = (state: ItemsState) => state.selectedItemId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of item ids
export const selectItemIds = selectIds;

// select the dictionary of item entities
export const selectItemEntities = selectEntities;

// select the array of items
export const selectAllItems = selectAll;

// select the total item count
export const selectItemTotal = selectTotal;
