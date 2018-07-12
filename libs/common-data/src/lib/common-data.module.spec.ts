import { async, TestBed } from '@angular/core/testing';
import { CommonDataModule } from './common-data.module';

describe('CommonDataModule', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [CommonDataModule]
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(CommonDataModule).toBeDefined();
  });
});
