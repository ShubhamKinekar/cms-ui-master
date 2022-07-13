import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCdslAccountDetailComponent } from './master-cdsl-account-detail.component';

describe('MasterCdslAccountDetailComponent', () => {
  let component: MasterCdslAccountDetailComponent;
  let fixture: ComponentFixture<MasterCdslAccountDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterCdslAccountDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCdslAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
