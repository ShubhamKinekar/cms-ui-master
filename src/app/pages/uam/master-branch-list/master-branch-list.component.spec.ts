import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBranchListComponent } from './master-branch-list.component';

describe('MasterBranchListComponent', () => {
  let component: MasterBranchListComponent;
  let fixture: ComponentFixture<MasterBranchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterBranchListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBranchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
