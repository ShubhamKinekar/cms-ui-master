import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSummaryListComponent } from './case-summary-list.component';

describe('CaseSummaryListComponent', () => {
  let component: CaseSummaryListComponent;
  let fixture: ComponentFixture<CaseSummaryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseSummaryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseSummaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
