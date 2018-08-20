import { ItemsLoaded } from './items.actions';
import { initialState, itemsReducer } from './items.reducer';

describe('itemsReducer', () => {
  it('should work', () => {
    const action: ItemsLoaded = new ItemsLoaded({});
    const actual = itemsReducer(initialState, action);
    expect(actual).toEqual({});
  });
});
