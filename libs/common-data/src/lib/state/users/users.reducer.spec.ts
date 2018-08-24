import { UsersLoaded } from './users.actions';
import { usersReducer, initialState } from './users.reducer';

fdescribe('usersReducer', () => {
  it('should work', () => {
    const action: UsersLoaded = new UsersLoaded([]);
    const actual = usersReducer(initialState, action);
    expect(actual).toEqual(initialState);
  });
});
