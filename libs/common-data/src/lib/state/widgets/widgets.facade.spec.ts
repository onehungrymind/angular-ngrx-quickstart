import { inject, TestBed } from '@angular/core/testing';

import { WidgetsFacade } from './widgets.facade';

describe('WidgetsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetsFacade]
    });
  });

  it('should be created', inject([WidgetsFacade], (service: WidgetsFacade) => {
    expect(service).toBeTruthy();
  }));
});
