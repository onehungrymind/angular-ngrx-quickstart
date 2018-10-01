import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Widget } from '@workspace/common-data';
import { WidgetsActions, WidgetsActionTypes } from './widgets.actions';

export const initialWidgets = [
  {
    id: "1",
    name: "Red Widget",
    price: 100,
    description: "This is a red widget"
  },
  {
    id: "2",
    name: "Orange Widget",
    price: 200,
    description: "This is an orange widget"
  },
  {
    id: "3",
    name: "Yellow Widget",
    price: 300,
    description: "This is a yellow widget"
  },
];

export interface WidgetsState extends EntityState<Widget> {
  selectedWidgetId: string | null;
}
export const adapter: EntityAdapter<Widget> = createEntityAdapter<Widget>();
export const initialState: WidgetsState = adapter.getInitialState({
  selectedWidgetId: null
});

export function widgetsReducer(
  state = initialState,
  action: WidgetsActions
): WidgetsState {
  switch (action.type) {
    case WidgetsActionTypes.WidgetSelected:
      return Object.assign({}, state, { selectedWidgetId: action.payload });
    case WidgetsActionTypes.WidgetsLoaded:
      return adapter.addAll(action.payload, state);
    case WidgetsActionTypes.WidgetAdded:
      return adapter.addOne(action.payload, state);
    case WidgetsActionTypes.UpdateWidget:
      return adapter.upsertOne(action.payload, state);
    case WidgetsActionTypes.DeleteWidget:
      return adapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}

export const getSelectedWidgetId = (state: WidgetsState) => state.selectedWidgetId;

const { selectIds, selectEntities, selectAll } = adapter.getSelectors();

export const selectWidgetIds = selectIds;
export const selectWidgetEntities = selectEntities;
export const selectAllWidgets = selectAll;
