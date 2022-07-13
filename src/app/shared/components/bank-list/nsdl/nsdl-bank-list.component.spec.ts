import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NSDLBankListComponent } from './nsdl-bank-list.component';

describe('NSDLBankListComponent', () => {
  let component: NSDLBankListComponent;
  let fixture: ComponentFixture<NSDLBankListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NSDLBankListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NSDLBankListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
