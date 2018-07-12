import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsTotalComponent } from './widgets-total.component';

describe('WidgetsTotalComponent', () => {
  let component: WidgetsTotalComponent;
  let fixture: ComponentFixture<WidgetsTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsTotalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
