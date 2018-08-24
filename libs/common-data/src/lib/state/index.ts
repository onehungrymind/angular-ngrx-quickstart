import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromItems from './items/items.reducer';
import * as fromWidgets from './widgets/widgets.reducer';
import * as fromUsers from './users/users.reducer';

export interface AppState {
  items: fromItems.ItemsState;
  widgets: fromWidgets.WidgetsState,
  users: fromUsers.UsersState
}

export const reducers: ActionReducerMap<AppState> = {
  items: fromItems.itemsReducer,
  widgets: fromWidgets.widgetsReducer,
  users: fromUsers.usersReducer
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
  (widgetEntities, widgetId) => {
    const emptyWidget = { id: null, name: '', price: 0, description: '' };
    return widgetId ? widgetEntities[widgetId] : emptyWidget;
  }
);

// -------------------------------------------------------------------
// USERS SELECTORS
// -------------------------------------------------------------------
export const selectUserUsersState = createFeatureSelector<fromUsers.UsersState>('users');

export const selectAllUsers = createSelector(
  selectUserUsersState,
  fromUsers.selectAllUsers
);

export const selectUsersDetails = createSelector(
  selectAllUsers,
  selectItemEntities,
  selectWidgetEntities,
  (users, itemEntities, widgetEntities) => {
    return users.map(u => ({
      ...u,
      items: u.items.map(itemId => itemEntities[itemId]),
      widgets: u.widgets.map(widgetId => widgetEntities[widgetId])
    }));
  }
);
