import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nrwl/nx/testing';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { NxModule } from '@nrwl/nx';
import { Item } from '../../core/items/item.model';
import { ItemsService } from '../../core/items/items.service';
import { ItemsServiceStub } from '../../core/items/items.service.stub';
import { itemsReducer, ItemsState } from './items.reducer';
import { ItemsFacade } from './items.facade';
import { ItemsEffects } from './items.effects';
import * as ItemsActions from './items.actions';

interface TestSchema {
  'items' : ItemsState
}

fdescribe('ItemsFacade', () => {
  let facade: ItemsFacade;
  let store: Store<TestSchema>;
  let createItem;
  let itemsService: ItemsService;

  beforeEach(() => {
    createItem = ( id:string, name = '', description = '', price = 0 ): Item => ({
      id,
      name: name ? `name-${id}` : id,
      description: description,
      price: price,
    });
  });

  describe('used in NgModule', () => {

    beforeEach(() => {
      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({items: itemsReducer}),
          EffectsModule.forRoot([ItemsEffects]),
        ],
        providers: [
          {provide: ItemsService, useClass: ItemsServiceStub},
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      itemsService = TestBed.get(ItemsService);
      store = TestBed.get(Store);
      facade = TestBed.get(ItemsFacade);
    });

    it('allItems$ should return the current list', async (done) => {
      try {
        let list = await readFirst(facade.allItems$);

        expect(list.length).toBe(0);

        store.dispatch(new ItemsActions.ItemsLoaded([
          createItem('AAA'),
          createItem('BBB')
        ]));

        list = await readFirst(facade.allItems$);

        expect(list.length).toBe(2);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('currentItem$ should return the currently selectedItem', async (done) => {
      try {
        let current = await readFirst(facade.currentItem$);

        expect(current.id).toBeNull();

        store.dispatch(new ItemsActions.ItemsLoaded([
          createItem('AAA'),
          createItem('BBB')
        ]));

        store.dispatch(new ItemsActions.ItemSelected('BBB'));

        current = await readFirst(facade.currentItem$);

        expect(current.id).toBe('BBB');

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('mutations$ should only stream mutative actions', () => {
      const addItemAction = new ItemsActions.AddItem({} as Item),
        updateItemAction = new ItemsActions.UpdateItem({} as Item),
        deleteItemAction = new ItemsActions.DeleteItem({} as Item);

      const actions = [];
      facade.mutations$.subscribe(mutation => {
        actions.push(mutation);
      });

      store.dispatch(addItemAction);
      store.dispatch(new ItemsActions.LoadItems());
      store.dispatch(updateItemAction);
      store.dispatch(new ItemsActions.ItemSelected({}));
      store.dispatch(deleteItemAction);

      const expectedActions = [
        addItemAction,
        updateItemAction,
        deleteItemAction
      ];

      expect(actions).toEqual(expectedActions);
    });

    describe('dispatchers', () => {

      beforeEach(() => {
        spyOn(store, 'dispatch');
      });

      it('#selectItem should dispatch `ItemSelected` action with an item ID', () => {
        const expectedAction = new ItemsActions.ItemSelected('AAA');
        facade.selectItem('AAA');
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#loadAll should dispatch `LoadItems` action', () => {
        const expectedAction = new ItemsActions.LoadItems();
        facade.loadAll();
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#addItem should dispatch `AddItem` action with an item', () => {
        const item = createItem('AAA');
        const expectedAction = new ItemsActions.AddItem(item);
        facade.addItem(item);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#updateItem should dispatch `UpdateItem` action with an item', () => {
        const item = createItem('AAA');
        const expectedAction = new ItemsActions.UpdateItem(item);
        facade.updateItem(item);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });

      it('#deleteItem should dispatch `DeleteItem` action with an item', () => {
        const item = createItem('AAA');
        const expectedAction = new ItemsActions.DeleteItem(item);
        facade.deleteItem(item);
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
      });
    });
  });
});
