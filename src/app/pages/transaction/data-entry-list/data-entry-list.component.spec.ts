import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseInitiationListComponent } from './case-initiation-list.component';

describe('CaseInitiationListComponent', () => {
  let component: CaseInitiationListComponent;
  let fixture: ComponentFixture<CaseInitiationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseInitiationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseInitiationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
