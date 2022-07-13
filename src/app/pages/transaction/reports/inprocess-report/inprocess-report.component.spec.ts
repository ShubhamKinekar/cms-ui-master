import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InprocessReportComponent } from './inprocess-report.component';

describe('InprocessReportComponent', () => {
  let component: InprocessReportComponent;
  let fixture: ComponentFixture<InprocessReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InprocessReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InprocessReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
