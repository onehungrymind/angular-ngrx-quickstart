import { Action } from '@ngrx/store';
import { UsersActions, UsersActionTypes } from './users.actions';
import { User } from '../../core/users/users.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

/**
 * Interface to the part of the Store containing UsersState
 * and other information related to User.
 */
export interface UsersState extends EntityState<User> {}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();
export const initialState: UsersState = adapter.getInitialState();

export function usersReducer(
  state = initialState,
  action: UsersActions
): UsersState {
  switch (action.type) {
    case UsersActionTypes.UsersLoaded: {
      return adapter.addAll(action.payload, state);
    }

    default:
      return state;
  }
}

// get the selectors
const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

// select the array of widget ids
export const selectUserIds = selectIds;

// select the dictionary of widget entities
export const selectUserEntities = selectEntities;

// select the array of widgets
export const selectAllUsers = selectAll;

// select the total widget count
export const selectUserTotal = selectTotal;
