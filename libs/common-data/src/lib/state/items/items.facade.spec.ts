import { inject, TestBed } from '@angular/core/testing';

import { ItemsFacade } from './items.facade';

describe('ItemsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemsFacade]
    });
  });

  it('should be created', inject([ItemsFacade], (service: ItemsFacade) => {
    expect(service).toBeTruthy();
  }));
});
