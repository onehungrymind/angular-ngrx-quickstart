import { ItemsLoaded } from './items.actions';
import { initialState, itemsReducer } from './items.reducer';

fdescribe('itemsReducer', () => {
  it('should load state', () => {
    const action: ItemsLoaded = new ItemsLoaded([]);
    const actual = itemsReducer(initialState, action);
    expect(actual).toEqual(initialState);
  });
});
