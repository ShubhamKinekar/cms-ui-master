import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeRangeRequestComponent } from './income-range-request.component';

describe('IncomeRangeRequestComponent', () => {
  let component: IncomeRangeRequestComponent;
  let fixture: ComponentFixture<IncomeRangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeRangeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeRangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
