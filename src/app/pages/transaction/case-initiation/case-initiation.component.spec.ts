import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseInitiationComponent } from './case-initiation.component';

describe('CaseInitiationComponent', () => {
  let component: CaseInitiationComponent;
  let fixture: ComponentFixture<CaseInitiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseInitiationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
