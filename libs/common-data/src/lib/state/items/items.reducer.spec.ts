import { ItemAdded, ItemDeleted, ItemsActionTypes, ItemSelected, ItemsLoaded, ItemUpdated } from './items.actions';
import { initialState, itemsReducer } from './items.reducer';
import { Action } from '@ngrx/store';
import { Item } from '@workspace/common-data';
import { selectCurrentItem, selectCurrentItemId } from '../index';

fdescribe('itemsReducer', () => {
  it('should return state with unknown action', () => {
    const action = {type: 'DoesNotExist', payload: 'Sample'} as Action;
    const actual = itemsReducer(initialState, action as any);
    expect(actual).toEqual(initialState);
  });

  it(`${ItemsActionTypes.ItemsLoaded} action should replace state with payload`, () => {
    const exampleItems: Item[] = [{id: 'cb1234-sa', name: 'test', description: 'testing', price: 10}];
    const entities = {
      'cb1234-sa': exampleItems[0]
    };

    const action: ItemsLoaded = new ItemsLoaded(exampleItems);
    const state = itemsReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it(`${ItemsActionTypes.ItemAdded} action should add item to state`, () => {
    const addedItem: Item = {id: 'added-item', name: 'added', description: 'added testing', price: 1001};
    const entities = {
      'added-item': addedItem
    };

    const action: ItemAdded = new ItemAdded(addedItem);
    const state = itemsReducer(initialState, action);
    expect(state.entities).toEqual(entities);
  });

  it(`${ItemsActionTypes.ItemUpdated} action should update item in state`, () => {
    const existingEntities = { 'existing-item': { id: 'existing-item', name: 'existing', description: 'existing testing', price: 1001 } };
    const existingState = {...initialState, entities: existingEntities};

    const updatedItem: Item = {id: 'existing-item', name: 'Updated item', description: 'updated testing', price: 320};

    const action: ItemUpdated = new ItemUpdated(updatedItem);
    const state = itemsReducer(existingState, action);
    expect(state.entities['existing-item']).toEqual(updatedItem);
  });

  it(`${ItemsActionTypes.ItemDeleted} action should remove item from state`, () => {
    const existingEntities = {
      'existing-item': { id: 'existing-item', name: 'existing', description: 'existing testing', price: 1001 },
      'another-item': { id: 'another-item', name: 'another', description: 'another testing', price: 5824 },
    };
    const existingState = {...initialState, entities: existingEntities};

    const deletedItem: Item = { id: 'another-item', name: 'another', description: 'another testing', price: 5824 };

    const action: ItemDeleted = new ItemDeleted(deletedItem);
    const state = itemsReducer(existingState, action);
    expect(state.entities['another-item']).not.toBeTruthy();
  });

  it(`${ItemsActionTypes.ItemSelected} action should set 'selectedItemId' in state`, () => {
    const selectedItem = 'item-id';

    const action: ItemSelected = new ItemSelected(selectedItem);
    const state = itemsReducer(initialState, action);
    expect(state.selectedItemId).toBe(selectedItem);
  });

  describe('selectors', () => {
    it('`selectCurrentItemId` should get currently selected item ID', () => {
      const state = {items: {...initialState, selectedItemId: '123'}};
      expect(selectCurrentItemId(state)).toBe('123');
    });

    describe('`selectCurrentItem`', () => {
      it('should get currently selected item', () => {
        const state = {
          items: {
            ...initialState,
            selectedItemId: '123',
            entities: { '123': { id: '123', name: 'Test', description: 'Testing', price: 134 } }
          }
        };
        expect(selectCurrentItem(state)).toBe(state.items.entities['123']);
      });

      it('should return an empty item if no selected item', () => {
        const state = {
          items: {
            ...initialState,
            selectedItemId: null,
            entities: { '123': { id: '123', name: 'Test', description: 'Testing', price: 134 } }
          }
        };
        expect(selectCurrentItem(state)).toEqual({ id: null, name: '', price: 0, description: '' });
      });
    })
  });
});
