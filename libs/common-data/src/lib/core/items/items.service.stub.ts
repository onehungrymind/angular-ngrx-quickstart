import { of } from 'rxjs';

export class ItemsServiceStub {
  all() {return of([])}
  create(item) {return of({})}
  update(item) {return of({})}
  delete(item) {return of({})}
}
