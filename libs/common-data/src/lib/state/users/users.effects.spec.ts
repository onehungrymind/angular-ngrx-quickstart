import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { UsersEffects } from './users.effects';
import { LoadUsers, UsersLoaded } from './users.actions';

import { Observable } from 'rxjs';

describe('UsersEffects', () => {
  let actions$: Observable<any>;
  let effects$: UsersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        UsersEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(UsersEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadUsers() });
      expect(effects$.loadUsers$).toBeObservable(
        hot('-a-|', { a: new UsersLoaded({}) })
      );
    });
  });
});
