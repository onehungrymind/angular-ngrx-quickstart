import { WidgetsLoaded } from './widgets.actions';
import { widgetsReducer, initialState } from './widgets.reducer';

describe('widgetsReducer', () => {
  it('should work', () => {
    const action: WidgetsLoaded = new WidgetsLoaded({});
    const actual = widgetsReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
