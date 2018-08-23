import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { Observable } from 'rxjs';

import { LoadWidgets, WidgetsLoaded } from './widgets.actions';
import { WidgetsEffects } from './widgets.effects';

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
      actions$ = hot('-a-|', { a: new LoadWidgets() });
      expect(effects$.loadWidgets$).toBeObservable(
        hot('-a-|', { a: new WidgetsLoaded([]) })
      );
    });
  });
});
