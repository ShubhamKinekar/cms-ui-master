import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailsModificationComponent } from './bank-details-modification.component';

describe('BankDetailsModificationComponent', () => {
  let component: BankDetailsModificationComponent;
  let fixture: ComponentFixture<BankDetailsModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankDetailsModificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDetailsModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
