import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNsdlAccountDetailComponent } from './master-nsdl-account-detail.component';

describe('MasterNsdlAccountDetailComponent', () => {
  let component: MasterNsdlAccountDetailComponent;
  let fixture: ComponentFixture<MasterNsdlAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterNsdlAccountDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNsdlAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
