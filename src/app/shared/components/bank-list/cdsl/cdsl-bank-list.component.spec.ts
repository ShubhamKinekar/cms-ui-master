import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDSLBankListComponent } from './cdsl-bank-list.component';

describe('CDSLBankListComponent', () => {
  let component: CDSLBankListComponent;
  let fixture: ComponentFixture<CDSLBankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CDSLBankListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CDSLBankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
