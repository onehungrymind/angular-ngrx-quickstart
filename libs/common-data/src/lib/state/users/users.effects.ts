import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  UsersActionTypes,
  LoadUsers,
  UsersLoaded
} from './users.actions';
import { UsersState } from './users.reducer';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import { UsersService } from '../../core/users/users.service';
import { User } from '../../core/users/users.model';

@Injectable()
export class UsersEffects {
  @Effect()
  loadUsers$ = this.dataPersistence.fetch(UsersActionTypes.LoadUsers, {
    run: (action: LoadUsers, state: UsersState) => {
      return this.usersService.all().pipe(map((res: User[]) => new UsersLoaded(res)))
    },

    onError: (action: LoadUsers, error) => {
      console.error('Error', error);
    }
  });

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<UsersState>,
    private usersService: UsersService
  ) {}
}
