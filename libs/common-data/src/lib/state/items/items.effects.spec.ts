import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { cold, hot } from '@nrwl/nx/testing';
import { Observable, of, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AddItem, DeleteItem, ItemAdded, ItemDeleted, ItemsLoaded, ItemUpdated, LoadItems, UpdateItem } from './items.actions';
import { ItemsEffects } from './items.effects';
import { ItemsService } from '../../core/items/items.service';
import { Item } from '../../core/items/item.model';
import { ItemsServiceStub } from '../../core/items/items.service.stub';

fdescribe('ItemsEffects', () => {
  let actions$: Observable<any>;
  let effects$: ItemsEffects;
  let itemsService: ItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ItemsEffects,
        DataPersistence,
        provideMockActions(() => actions$),
        {provide: ItemsService, useClass: ItemsServiceStub}
      ]
    });

    effects$ = TestBed.get(ItemsEffects);
    itemsService = TestBed.get(ItemsService);
  });

  describe('`loadItems$`', () => {
    it('should trigger `ItemsLoaded` action with data from `ItemsService.all`', () => {
      const items = [{id: 'csa-132', name: 'Test', description: 'Testing', price: 4313}];
      spyOn(itemsService, 'all').and.returnValue(of(items));

      actions$ = hot('-a-|', { a: new LoadItems() });
      const expected$ = cold('-a-|', { a: new ItemsLoaded(items) });

      expect(effects$.loadItems$).toBeObservable(expected$);
      expect(itemsService.all).toHaveBeenCalled();
    });

    it('should log errors', () => {
      spyOn(itemsService, 'all').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new LoadItems() });
      effects$.loadItems$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  describe('`addItem$`', () => {
    it('should trigger `ItemAdded` action with data from `ItemsService.create`', () => {
      const item = {id: null, name: 'Test', description: 'Testing', price: 4313};
      const createdItem = {...item, id: 'jhh14-created'};
      spyOn(itemsService, 'create').and.returnValue(of(createdItem));

      actions$ = hot('-a-|', { a: new AddItem(item) });
      const expected$ = cold('-a-|', { a: new ItemAdded(createdItem) });

      expect(effects$.addItem$).toBeObservable(expected$);
      expect(itemsService.create).toHaveBeenCalledWith(item);
    });

    it('should log errors', () => {
      spyOn(itemsService, 'create').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new AddItem({} as Item) });
      effects$.addItem$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  describe('`updateItem$`', () => {
    it('should trigger `ItemUpdated` action with data from `ItemsService.update`', () => {
      const item = {id: 'jhh14-updated', name: 'Test', description: 'Testing', price: 4313};
      const updatedItem = {...item, name: 'Updated', description: 'Different'};
      spyOn(itemsService, 'update').and.returnValue(of(updatedItem));

      actions$ = hot('-a-|', { a: new UpdateItem(item) });
      const expected$ = cold('-a-|', { a: new ItemUpdated(updatedItem) });

      expect(effects$.updateItem$).toBeObservable(expected$);
      expect(itemsService.update).toHaveBeenCalledWith(item);
    });

    it('should log errors', () => {
      spyOn(itemsService, 'update').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new UpdateItem({} as Item) });
      effects$.updateItem$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });

  describe('`deleteItem$`', () => {
    it('should trigger `ItemDeleted` action with data from `ItemsService.delete`', () => {
      const item = {id: 'jhh14-deleted', name: 'Test', description: 'Testing', price: 4313};
      spyOn(itemsService, 'delete').and.returnValue(of(item));

      actions$ = hot('-a-|', { a: new DeleteItem(item) });
      const expected$ = cold('-a-|', { a: new ItemDeleted(item) });

      expect(effects$.deleteItem$).toBeObservable(expected$);
      expect(itemsService.delete).toHaveBeenCalledWith(item);
    });

    it('should log errors', () => {
      spyOn(itemsService, 'delete').and.returnValue(throwError('That did not go well...'));
      spyOn(console, 'error').and.callThrough();

      actions$ = hot('-a-|', { a: new DeleteItem({} as Item) });
      effects$.deleteItem$
        .pipe(finalize(() => expect(console.error).toHaveBeenCalledWith('Error', 'That did not go well...')))
        .subscribe();
    });
  });
});
