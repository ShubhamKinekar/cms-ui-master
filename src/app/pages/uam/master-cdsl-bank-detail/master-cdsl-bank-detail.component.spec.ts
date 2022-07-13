import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCdslBankDetailComponent } from './master-cdsl-bank-detail.component';

describe('MasterCdslBankDetailComponent', () => {
  let component: MasterCdslBankDetailComponent;
  let fixture: ComponentFixture<MasterCdslBankDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterCdslBankDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCdslBankDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
