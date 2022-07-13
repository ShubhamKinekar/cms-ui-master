import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCdslAccountListComponent } from './master-cdsl-account-list.component';

describe('MasterCdslAccountListComponent', () => {
  let component: MasterCdslAccountListComponent;
  let fixture: ComponentFixture<MasterCdslAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterCdslAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCdslAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
