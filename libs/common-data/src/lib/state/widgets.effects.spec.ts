import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { WidgetsEffects } from './widgets.effects';
import { LoadWidgets, WidgetsLoaded } from './widgets.actions';

import { Observable } from 'rxjs';

describe('WidgetsEffects', () => {
  let actions$: Observable<any>;
  let effects$: WidgetsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      providers: [
        WidgetsEffects,
        DataPersistence,
        provideMockActions(() => actions$)
      ]
    });

    effects$ = TestBed.get(WidgetsEffects);
  });

  describe('someEffect', () => {
    it('should work', () => {
      actions$ = hot('-a-|', { a: new LoadWidgets({}) });
      expect(effects$.loadWidgets$).toBeObservable(
        hot('-a-|', { a: new WidgetsLoaded({}) })
      );
    });
  });
});
