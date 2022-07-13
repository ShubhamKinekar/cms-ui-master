import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBranchDetailComponent } from './master-branch-detail.component';

describe('MasterBranchDetailComponent', () => {
  let component: MasterBranchDetailComponent;
  let fixture: ComponentFixture<MasterBranchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterBranchDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBranchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
