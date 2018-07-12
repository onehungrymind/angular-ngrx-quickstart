import { async, TestBed } from '@angular/core/testing';
import { TotalsViewModule } from './totals-view.module';

describe('TotalsViewModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [TotalsViewModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(TotalsViewModule).toBeDefined();
  });
});
