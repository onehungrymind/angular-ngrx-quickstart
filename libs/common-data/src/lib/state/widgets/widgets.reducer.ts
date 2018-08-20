import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Widget } from '@workspace/common-data';

import { WidgetsActions, WidgetsActionTypes } from './widgets.actions';

/**
 * Interface to the part of the Store containing WidgetsState
 * and other information related to WidgetsData.
 */
export interface WidgetsState extends EntityState<Widget> {
  selectedWidgetId: string | null;
}

export const adapter: EntityAdapter<Widget> = createEntityAdapter<Widget>();
export const initialState: WidgetsState = adapter.getInitialState({
  // additional entity state properties
  selectedWidgetId: null,
});

export function widgetsReducer(
  state = initialState,
  action: WidgetsActions
): WidgetsState {
  switch (action.type) {
    case WidgetsActionTypes.WidgetSelected: {
      return Object.assign({}, state, { selectedWidgetId: action.payload });
    }

    case WidgetsActionTypes.WidgetsLoaded: {
      return adapter.addAll(action.payload, state);
    }

    case WidgetsActionTypes.WidgetAdded: {
      return adapter.addOne(action.payload, state);
    }

    case WidgetsActionTypes.WidgetUpdated: {
      return adapter.upsertOne(action.payload, state);
    }

    case WidgetsActionTypes.WidgetDeleted: {
      return adapter.removeOne(action.payload.id, state);
    }

    default:
      return state;
  }
}

export const getSelectedWidgetId = (state: WidgetsState) => state.selectedWidgetId;

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of widget ids
export const selectWidgetIds = selectIds;

// select the dictionary of widget entities
export const selectWidgetEntities = selectEntities;

// select the array of widgets
export const selectAllWidgets = selectAll;

// select the total widget count
export const selectWidgetTotal = selectTotal;

