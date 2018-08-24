import { Action } from '@ngrx/store';

export enum UsersActionTypes {
  LoadUsers = '[Users] Load Data',
  UsersLoaded = '[Users] Data Loaded'
}

export class LoadUsers implements Action {
  readonly type = UsersActionTypes.LoadUsers;
  constructor() {}
}

export class UsersLoaded implements Action {
  readonly type = UsersActionTypes.UsersLoaded;
  constructor(public payload: any) {}
}

export type UsersActions = LoadUsers | UsersLoaded;
