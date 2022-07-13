import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCdslBankListComponent } from './master-cdsl-bank-list.component';

describe('MasterCdslBankListComponent', () => {
  let component: MasterCdslBankListComponent;
  let fixture: ComponentFixture<MasterCdslBankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterCdslBankListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCdslBankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
