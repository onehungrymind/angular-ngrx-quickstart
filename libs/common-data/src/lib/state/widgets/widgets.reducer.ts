import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Widget } from '@workspace/common-data';
import { Action } from '@ngrx/store';
import { WidgetsActions, WidgetsActionTypes } from './widgets.actions';

const initialWidgets = [
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

const createWidget = (widgets, widget) => [...widgets, widget];
const updateWidget = (widgets, widget) => widgets.map(w => {
  return w.id === widget.id ? Object.assign({}, widget) : w;
});
const deleteWidget = (widgets, widget) => widgets.filter(w => widget.id !== w.id);

export interface WidgetsState {
  selectedWidgetId: string | null;
  widgets: Widget[];
}

export const initialState: WidgetsState = {
  selectedWidgetId: null,
  widgets: initialWidgets
};

export function widgetsReducer(
  state = initialState,
  action: WidgetsActions
): WidgetsState {
  switch (action.type) {
    case WidgetsActionTypes.WidgetSelected:
      return {
        selectedWidgetId: action.payload,
        widgets: state.widgets
      };
    case WidgetsActionTypes.AddWidget:
      return {
        selectedWidgetId: state.selectedWidgetId,
        widgets: createWidget(state.widgets, action.payload)
      };
    case WidgetsActionTypes.UpdateWidget:
      return {
        selectedWidgetId: state.selectedWidgetId,
        widgets: updateWidget(state.widgets, action.payload)
      };
    case WidgetsActionTypes.DeleteWidget:
      return {
        selectedWidgetId: state.selectedWidgetId,
        widgets: deleteWidget(state.widgets, action.payload)
      };
    default:
      return state;
  }
}
