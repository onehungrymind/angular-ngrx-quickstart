import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { Observable } from 'rxjs';

import { ItemsLoaded, LoadItems } from './items.actions';
import { ItemsEffects } from './items.effects';

describe('ItemsEffects', () => {
  let actions$: Observable<any>;
  let effects$: ItemsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        ItemsEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(ItemsEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadItems({}) });
      expect(effects$.loadItems$).toBeObservable(
        hot('-a-|', { a: new ItemsLoaded({}) })
      );
    });
  });
});
