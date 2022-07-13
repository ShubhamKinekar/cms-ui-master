import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNsdlBankDetailComponent } from './master-nsdl-bank-detail.component';

describe('MasterNsdlBankDetailComponent', () => {
  let component: MasterNsdlBankDetailComponent;
  let fixture: ComponentFixture<MasterNsdlBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterNsdlBankDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNsdlBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
