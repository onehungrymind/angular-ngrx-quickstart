import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Widget } from '@workspace/common-data';
import { Action } from '@ngrx/store';

interface WidgetsAction extends Action {
  payload: any;
}

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
  action: WidgetsAction
): WidgetsState {
  switch (action.type) {
    case 'select':
      return {
        selectedWidgetId: action.payload.id,
        widgets: state.widgets
      };
    case 'create':
      return {
        selectedWidgetId: state.selectedWidgetId,
        widgets: createWidget(state.widgets, action.payload)
      };
    case 'update':
      return {
        selectedWidgetId: state.selectedWidgetId,
        widgets: updateWidget(state.widgets, action.payload)
      };
    case 'delete':
      return {
        selectedWidgetId: state.selectedWidgetId,
        widgets: deleteWidget(state.widgets, action.payload)
      };
    default:
      return state;
  }
}
