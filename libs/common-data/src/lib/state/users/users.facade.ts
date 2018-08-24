import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersState } from './users.reducer';
import { selectUsersDetails } from '..';

@Injectable({
  providedIn: 'root'
})
export class UsersFacade {
  allUsers$ = this.store.pipe(select(selectUsersDetails));

  constructor(private store: Store<UsersState>) {}

  loadUsers() {
    this.store.dispatch(new UsersActions.LoadUsers());
  }
}
