import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterBranchUploadComponent } from './master-branch-upload.component';

describe('MasterBranchUploadComponent', () => {
  let component: MasterBranchUploadComponent;
  let fixture: ComponentFixture<MasterBranchUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterBranchUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterBranchUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
