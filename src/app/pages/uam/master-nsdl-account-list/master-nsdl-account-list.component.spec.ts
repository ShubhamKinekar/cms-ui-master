import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterNsdlAccountListComponent } from './master-nsdl-account-list.component';

describe('MasterNsdlAccountListComponent', () => {
  let component: MasterNsdlAccountListComponent;
  let fixture: ComponentFixture<MasterNsdlAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterNsdlAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterNsdlAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
