import { WidgetsLoaded } from './widgets.actions';
import { initialState, widgetsReducer } from './widgets.reducer';

describe('widgetsReducer', () => {
  it('should work', () => {
    const action: WidgetsLoaded = new WidgetsLoaded([]);
    const actual = widgetsReducer(initialState, action);
    expect(actual).toEqual(<any>[]);
  });
});
