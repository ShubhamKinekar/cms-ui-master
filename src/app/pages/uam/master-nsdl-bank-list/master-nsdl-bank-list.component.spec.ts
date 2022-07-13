import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNsdlBankListComponent } from './master-nsdl-bank-list.component';

describe('MasterNsdlBankListComponent', () => {
  let component: MasterNsdlBankListComponent;
  let fixture: ComponentFixture<MasterNsdlBankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterNsdlBankListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNsdlBankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
